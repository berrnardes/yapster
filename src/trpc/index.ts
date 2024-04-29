import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query";
// import { PLANS } from "@/config/stripe";
// import { getUserSubscriptionPlan, stripe } from "@/lib/stripe";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { privateProcedures, publicProcedures, router } from "./trpc";

export const appRouter = router({
	health: publicProcedures.query(() => {
		return { sucess: "Ok" };
	}),
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

			console.log(userId);

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
	// createStripeSession: privateProcedures.mutation(async ({ ctx }) => {
	// 	const { userId } = ctx;

	// 	const billingUrl = absoluteUrl("/dashboard/billing");

	// 	if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

	// 	const dbUser = await db.user.findFirst({
	// 		where: {
	// 			id: userId,
	// 		},
	// 	});

	// 	if (!dbUser) throw new TRPCError({ code: "UNAUTHORIZED" });

	// 	const subscriptionPlan = await getUserSubscriptionPlan();

	// 	if (subscriptionPlan.isSubscribed && dbUser.stripeCustomerId) {
	// 		const stripeSession = await stripe.billingPortal.sessions.create({
	// 			customer: dbUser.stripeCustomerId,
	// 			return_url: billingUrl,
	// 		});

	// 		return { url: stripeSession.url };
	// 	}

	// 	const stripeSession = await stripe.checkout.sessions.create({
	// 		success_url: billingUrl,
	// 		cancel_url: billingUrl,
	// 		payment_method_types: ["card", "boleto"],
	// 		mode: "subscription",
	// 		billing_address_collection: "auto",
	// 		line_items: [
	// 			{
	// 				price: PLANS.find((plan) => plan.name === "Pro")?.price.priceIds.test,
	// 				quantity: 1,
	// 			},
	// 		],
	// 		metadata: {
	// 			userId: userId,
	// 		},
	// 	});

	// 	return { url: stripeSession.url };
	// }),
});

export type AppRouter = typeof appRouter;
