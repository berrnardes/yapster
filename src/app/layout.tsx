import Navigation from "@/components/navigation";
import Providers from "@/components/providers";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Noto_Sans_Display } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_Display({
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
		<Providers>
			<ClerkProvider>
				<html lang="en">
					<body
						className={cn(
							"grainy min-h-screen font-sans antialiased",
							noto.className
						)}
					>
						<Navigation />
						{children}
					</body>
				</html>
			</ClerkProvider>
		</Providers>
	);
}
