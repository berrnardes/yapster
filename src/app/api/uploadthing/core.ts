import { PLANS } from "@/config/stripe";
import { db } from "@/db";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { FileRouter, createUploadthing } from "uploadthing/next";
import { UTApi } from "uploadthing/server";

const f = createUploadthing();

const middleware = async () => {
	const user = await currentUser();

	if (!user || !user.id) throw new Error("UNAUTHORIZED");

	const subscriptionPlan = await getUserSubscriptionPlan();

	return { subscriptionPlan, userId: user.id };
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

		const pageAmnt = document.length;

		const { subscriptionPlan } = metadata;

		const { isSubscribed } = subscriptionPlan;

		const isProExceeded =
			pageAmnt > PLANS.find((plan) => plan.name === "Pro")!.pagesPerPdf;

		const isFreeExceeded =
			pageAmnt > PLANS.find((plan) => plan.name === "Free")!.pagesPerPdf;

		if ((isSubscribed && isProExceeded) || (!isSubscribed && isFreeExceeded)) {
			await db.file.update({
				data: {
					uploadStatus: "FAILED",
				},
				where: {
					id: createdFile.id,
				},
			});
		}

		const embeddings = new OpenAIEmbeddings();

		const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY as string });

		const index = pc.Index("yapster");

		await PineconeStore.fromDocuments(document, embeddings, {
			pineconeIndex: index,
			namespace: createdFile.id,
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
	//BUG: change pro plan size
	freePlanUploader: f({ pdf: { maxFileSize: "8MB" } })
		.middleware(middleware)
		.onUploadComplete(onCompleteUpload),
	proPlanUploader: f({ pdf: { maxFileSize: "16MB" } })
		.middleware(middleware)
		.onUploadComplete(onCompleteUpload),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
export const utapi = new UTApi();
