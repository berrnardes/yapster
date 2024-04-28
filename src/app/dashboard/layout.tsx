import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
	const user = await currentUser();
	return <div>{children}</div>;
};

export default Layout;
