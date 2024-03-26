import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { privateProcedures, publicProcedures, router } from "./trpc";

export const appRouter = router({
	authCallback: publicProcedures.query(async () => {
		const user = await currentUser();

		if (!user?.id || !user?.emailAddresses[0].emailAddress) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}

		const dbUser = await db.user.findFirst({
			where: {
				id: user.id,
			},
		});

		if (!dbUser) {
			await db.user.create({
				data: {
					id: user.id,
					email: user.emailAddresses[0].emailAddress,
				},
			});
		}
		return { success: true };
	}),
	getFile: privateProcedures
		.input(z.object({ key: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const { userId } = ctx;

			const file = await db.file.findFirst({
				where: {
					key: input.key,
					userId,
				},
			});

			if (!file) throw new TRPCError({ code: "NOT_FOUND" });

			return file;
		}),

	getUserFiles: privateProcedures.query(async ({ ctx }) => {
		const { userId } = ctx;

		return await db.file.findMany({
			where: {
				userId,
			},
		});
	}),
	getFileMessages: privateProcedures
		.input(
			z.object({
				limit: z.number().min(1).max(100).nullish(),
				cursor: z.string().nullish(),
				fileId: z.string(),
			})
		)
		.query(async ({ ctx, input }) => {
			const { userId } = ctx;
			const { cursor, fileId } = input;

			const c: typeof cursor = "ddd";

			const limit = input.limit ?? INFINITE_QUERY_LIMIT;

			const file = await db.file.findFirst({
				where: {
					id: fileId,
					userId: userId,
				},
			});

			if (!fileId) throw new TRPCError({ code: "NOT_FOUND" });

			const messages = await db.message.findMany({
				take: limit + 1,
				where: {
					fileId,
				},
				orderBy: {
					createdAt: "desc",
				},
				cursor: cursor ? { id: cursor } : undefined,
				select: {
					id: true,
					isUserMessage: true,
					createdAt: true,
					text: true,
				},
			});

			let nextCursor: typeof cursor | undefined = undefined;
			if (messages.length > limit) {
				const nexItem = messages.pop();
				nextCursor = nexItem?.id;
			}

			return {
				messages,
				nextCursor,
			};
		}),
	getFileUploadStatus: privateProcedures
		.input(z.object({ fileId: z.string() }))
		.query(async ({ input, ctx }) => {
			const file = await db.file.findFirst({
				where: {
					id: input.fileId,
					userId: ctx.userId,
				},
			});

			if (!file) return { status: "PENDING" as const };

			return { status: file.uploadStatus };
		}),
});

export type AppRouter = typeof appRouter;
