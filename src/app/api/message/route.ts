import { db } from "@/db";
import { openai } from "@/lib/openai";
import { sendMessageValidator } from "@/lib/validators/send-message-validator";
import { currentUser } from "@clerk/nextjs/server";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { NextRequest } from "next/server";

import { client } from "@/lib/supabase";
import { OpenAIStream, StreamingTextResponse } from "ai";

type Tmsg = {
	id: string;
	text: string;
	isUserMessage: boolean;
	createdAt: Date;
	updatadAt: Date;
	userId: string;
	fileId: string | null;
};

export const POST = async (req: NextRequest) => {
	const body = await req.json();

	// Check if the request was maded by a signed user
	const user = await currentUser();
	if (!user?.id) {
		return new Response("Unauthorized", { status: 401 });
	}

	// Infer the values that comes from my body request
	const { fileId, message } = sendMessageValidator.parse(body);

	// Find the file from corresponding user, in the database via prisma
	const file = await db.file.findFirst({
		where: {
			id: fileId,
			userId: user.id,
		},
	});

	if (!file) {
		return new Response("Not Found", { status: 404 });
	}

	await db.message.create({
		data: {
			text: message,
			isUserMessage: true,
			userId: user.id,
			fileId: file.id,
		},
	});

	// Vectorize message
	const embeddings = new OpenAIEmbeddings({
		openAIApiKey: process.env.OPENAI_API_KEY,
	});

	const supabaseClient = client;
	const vectorStore = await SupabaseVectorStore.fromExistingIndex(embeddings, {
		client: supabaseClient,
		tableName: "documents",
		queryName: "match_documents",
	});

	const results = await vectorStore.similaritySearch(message, 4);

	// Search for messages related to the current file
	const prevMessages = await db.message.findMany({
		where: {
			fileId,
		},
		orderBy: {
			createdAt: "asc",
		},
		take: 6,
	});

	// Format the values came from database to show in ui
	const formattedPrevMessage = prevMessages.map((msg: Tmsg) => ({
		role: msg.isUserMessage ? ("user" as const) : ("assistant" as const),
		content: msg.text,
	}));

	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		temperature: 0,
		stream: true,
		messages: [
			{
				// Instructions for the model to know to behave
				role: "system",
				content:
					"Use os seguintes trechos de contexto (ou conversa anterior, se necessário) para responder à pergunta do usuário em formato markdown.",
			},
			{
				role: "user",
				content: `Use os seguintes trechos de contexto (ou conversa anterior, se necessário) para responder à pergunta do usuário em formato markdown. \nSe você não souber a resposta, apenas fale que você não sabe, não tente responder.
                \n----------------\n
                CONVERSAS ANTERIOR:
                ${formattedPrevMessage.map((message) => {
									if (message.role === "user")
										return `Usuário: ${message.content}`;
								})}
                
                \n----------------\n

                CONTEXTO:
                ${results.map((r) => r.pageContent).join("\n\n")}

                ENTRADA DO USUÁRIO: ${message}
                `,
			},
		],
	});

	const stream = OpenAIStream(response, {
		async onCompletion(completion) {
			await db.message.create({
				data: {
					text: completion,
					isUserMessage: false,
					fileId,
					userId: user.id,
				},
			});
		},
	});

	return new StreamingTextResponse(stream);
};
