import Navigation from "@/components/navigation";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	weight: ["200", "400", "600", "800"],
});

export const metadata: Metadata = {
	title: "Yapster",
	description: "Your Favorite Tool For Learning",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={cn(
						"grainy min-h-screen font-sans antialiased",
						inter.className
					)}
				>
					<Navigation />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
