import { db } from "@/db";
import { client } from "@/lib/supabase";
import { currentUser } from "@clerk/nextjs/server";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { FileRouter, createUploadthing } from "uploadthing/next";

const f = createUploadthing();

const middleware = async () => {
	const user = await currentUser();

	if (!user || !user.id) throw new Error("UNAUTHORIZED");

	return { userId: user.id };
};

const onCompleteUpload = async ({
	metadata,
	file,
}: {
	metadata: Awaited<ReturnType<typeof middleware>>;
	file: {
		key: string;
		name: string;
		url: string;
	};
}) => {
	// Checks if the file already exists
	const isFileExists = await db.file.findFirst({
		where: {
			key: file.key,
		},
	});

	if (isFileExists) return;

	const createdFile = await db.file.create({
		data: {
			key: file.key,
			name: file.name,
			userId: metadata.userId,
			url: `https://utfs.io/f/${file.key}`,
			uploadStatus: "PROCESSING",
		},
	});

	// PREPARE THE FILE TO BE READED FOR LLM
	try {
		const response = await fetch(`https://utfs.io/f/${file.key}`);

		const blob = await response.blob();

		const document = await new PDFLoader(blob).load();

		const embeddings = new OpenAIEmbeddings();

		const supabaseClient = client;

		await SupabaseVectorStore.fromDocuments(document, embeddings, {
			client: supabaseClient,
			tableName: "documents",
			queryName: "match_documents",
		});

		await db.file.update({
			data: {
				uploadStatus: "SUCCESS",
			},
			where: {
				id: createdFile.id,
			},
		});
	} catch (e) {
		console.log("Error:", e);
		await db.file.update({
			data: {
				uploadStatus: "FAILED",
			},
			where: {
				id: createdFile.id,
			},
		});
	}
};

export const ourFileRouter = {
	freePlanUploader: f({ pdf: { maxFileSize: "32MB" } })
		.middleware(middleware)
		.onUploadComplete(onCompleteUpload),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
