import { currentUser } from "@clerk/nextjs/server";
import { TRPCError, initTRPC } from "@trpc/server";

const t = initTRPC.create();
const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
	const user = await currentUser();

	if (!user || !user.id) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}

	return opts.next({
		ctx: {
			userId: user.id,
			user: user,
		},
	});
});

export const router = t.router;
export const publicProcedures = t.procedure;
export const privateProcedures = t.procedure.use(isAuth);
