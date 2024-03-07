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
});

export type AppRouter = typeof appRouter;
