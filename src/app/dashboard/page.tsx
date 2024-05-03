import { db } from "@/db";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Dashboard from "./dashboard";

const Page = async () => {
	const user = await currentUser();

	if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

	const dbUser = await db.user.findUnique({
		where: {
			id: user?.id,
		},
	});

	if (!dbUser) redirect("/auth-callback?origin=dashboard");

	const userSubscription = await getUserSubscriptionPlan();

	return <Dashboard userSubscription={userSubscription} />;
};

export default Page;
