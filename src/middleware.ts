import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: ["/", "/api/uploadthing", "/pricing"],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
