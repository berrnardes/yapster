import { ptBR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
	return <ClerkProvider localization={ptBR}>{children}</ClerkProvider>;
};

export default Providers;
