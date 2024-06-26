import Dashboard from "@/components/dashboard";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
	const user = await currentUser();
	if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

	const dbUser = await db.user.findUnique({
		where: {
			id: user.id,
		},
	});

	if (!dbUser) {
		console.log("User doesn't exists");
		redirect("/auth-callback?origin=dashboard");
	}

	return <Dashboard />;
};

export default Page;
