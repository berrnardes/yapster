import Navigation from "@/components/navigation";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import "react-loading-skeleton/dist/skeleton.css";
import "simplebar-react/dist/simplebar.min.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Yapster - Home",
	description: "Sua Ferramenta de Estudos",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Providers>
			<html lang="pt-br">
				<body
					className={cn(
						"bg-zinc-100 min-h-screen font-sans antialiased",
						inter.className
					)}
				>
					<Toaster />
					<Navigation />
					{children}
				</body>
			</html>
		</Providers>
	);
}
