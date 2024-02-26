import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
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
		<html lang="en">
			<body
				className={cn(
					"grainy min-h-screen font-sans antialiased",
					poppins.className
				)}
			>
				{children}
			</body>
		</html>
	);
}
