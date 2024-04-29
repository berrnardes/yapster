import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
	title: "Yapster - Dashboard",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
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
	return <div>{children}</div>;
};

export default Layout;
