import { SignInButton, SignUpButton, UserButton, auth } from "@clerk/nextjs";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MaxWidthWrapper from "./max-width-wrapper";
import MobileNav from "./mobile-nav";
import { buttonVariants } from "./ui/button";

const Navigation = () => {
	const { userId } = auth();

	return (
		<div className="min-h-14 sticky inset-x-2 w-full bg-white/75 border-zinc-200 backdrop-blur-lg transition-all border-b top-0 z-30">
			<MaxWidthWrapper>
				<div className="flex min-h-14 justify-between items-center border-b border-zinc-200">
					<h1 className="text-xl font-semibold text-zinc-700">
						<Link href="/">
							<Image
								priority={true}
								src="/yapster-logo.svg"
								alt="Yapster"
								width={130}
								height={20}
							/>
						</Link>
					</h1>
					{/* TODO MOBILE NAV */}
					<MobileNav isAuth={!!userId} />
					<div className="hidden sm:flex items-center space-x-4">
						{!userId ? (
							<>
								<Link
									href="/pricing"
									className={buttonVariants({ size: "sm", variant: "ghost" })}
								>
									Pricing
								</Link>
								<Link
									href="/"
									className={buttonVariants({ size: "sm", variant: "ghost" })}
								>
									<SignInButton>Login</SignInButton>
								</Link>
								<Link href="/" className={buttonVariants({ size: "sm" })}>
									<SignUpButton>Get Started</SignUpButton>
									<ArrowRight className="h-4 w-4 ml-1.5" />
								</Link>
							</>
						) : (
							<>
								<Link
									href="/dashboard"
									className={buttonVariants({ size: "sm", variant: "ghost" })}
								>
									Dashboard
								</Link>
								<div>
									<UserButton afterSignOutUrl="/" />
								</div>
							</>
						)}
					</div>
				</div>
			</MaxWidthWrapper>
		</div>
	);
};

export default Navigation;
