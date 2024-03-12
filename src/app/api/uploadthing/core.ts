import { db } from "@/db";
import { currentUser } from "@clerk/nextjs";
import { FileRouter, createUploadthing } from "uploadthing/next";

type onCompleteUploadProps = {
	metadata: Awaited<ReturnType<typeof middleware>>;
	file: {
		key: string;
		name: string;
		url: string;
	};
};

const f = createUploadthing();

const middleware = async () => {
	const user = await currentUser();

	if (!user || !user.id) throw new Error("UNAUTHORIZED");

	return { userId: user.id };
};

const onCompleteUpload = async ({ metadata, file }: onCompleteUploadProps) => {
	const isFileExists = await db.file.findFirst({
		where: {
			key: file.key,
		},
	});

	if (isFileExists) return;

	await db.file.create({
		data: {
			key: file.key,
			name: file.name,
			userId: metadata.userId,
			url: `https://utfs.io/f/${file.key}`,
			uploadStatus: "PROCESSING",
		},
	});
};

export const ourFileRouter = {
	freePlanUploader: f({ pdf: { maxFileSize: "4MB" } })
		.middleware(middleware)
		.onUploadComplete(onCompleteUpload),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
