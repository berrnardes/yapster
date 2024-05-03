// import { SignInButton, SignUpButton, UserButton, auth } from "@clerk/nextjs";
// import { getUserSubscriptionPlan } from "@/lib/stripe";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import MaxWidthWrapper from "./max-width-wrapper";
import MobileNav from "./mobile-nav";
import { buttonVariants } from "./ui/button";

const Navigation = async () => {
	const { userId } = auth();
	const subscriptionPlan = await getUserSubscriptionPlan();

	return (
		<div className="min-h-14 sticky inset-x-2 w-full bg-white/75 border-zinc-200 backdrop-blur-lg transition-all border-b top-0 z-30">
			<MaxWidthWrapper>
				<div className="flex min-h-14 justify-between items-center border-b border-zinc-200">
					<h1 className="text-xl font-semibold text-zinc-700">
						<Link href="/">
							<Image
								priority={true}
								className="w-40 h-10"
								src="/yapster-logo.svg"
								alt="Yapster"
								width={170}
								height={16}
							/>
						</Link>
					</h1>
					<MobileNav
						isAuth={!!userId}
						isSubscribed={subscriptionPlan.isSubscribed}
					/>
					<div className="hidden sm:flex justify-center items-center space-x-4">
						{!userId ? (
							<>
								<Link
									href="/pricing"
									className={buttonVariants({ size: "sm", variant: "ghost" })}
								>
									Preços
								</Link>
								<Link
									href="/"
									className={buttonVariants({ size: "sm", variant: "ghost" })}
								>
									<SignInButton>Entrar</SignInButton>
								</Link>
								<Link
									href="/"
									className={buttonVariants({
										size: "sm",
										className: "bg-emerald-700",
									})}
								>
									<SignUpButton>Criar Conta</SignUpButton>
								</Link>
							</>
						) : (
							<>
								<Link
									href="/dashboard/billing"
									className={buttonVariants({ size: "sm", variant: "ghost" })}
								>
									{subscriptionPlan.isSubscribed ? (
										<p>Seu Plano</p>
									) : (
										<p>💎 Upgrade</p>
									)}
								</Link>

								<Link
									href="/dashboard"
									className={buttonVariants({
										size: "sm",
										className: "bg-emerald-700",
									})}
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
