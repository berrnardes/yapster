import Navigation from "@/components/navigation";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Noto_Sans_Display } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";
import "simplebar-react/dist/simplebar.min.css";
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
							"bg-zinc-100 min-h-screen font-sans antialiased",
							noto.className
						)}
					>
						<Navigation />
						<Toaster />
						{children}
					</body>
				</html>
			</ClerkProvider>
		</Providers>
	);
}
