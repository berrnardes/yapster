import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
	return <ClerkProvider>{children}</ClerkProvider>;
};

export default Providers;