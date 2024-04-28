// import { SignInButton, SignUpButton, UserButton, auth } from "@clerk/nextjs";
// import { getUserSubscriptionPlan } from "@/lib/stripe";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MaxWidthWrapper from "./max-width-wrapper";
import MobileNav from "./mobile-nav";
import { buttonVariants } from "./ui/button";

const Navigation = async () => {
	//   const { userId } = auth();
	//   const subscriptionPlan = await getUserSubscriptionPlan();

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
					{/* TODO MOBILE NAV */}
					<MobileNav isAuth={true} />
					<div className="hidden sm:flex items-center space-x-4">
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
								Entrar
							</Link>
							<Link
								href="/"
								className={buttonVariants({
									size: "sm",
									className: "bg-emerald-700",
								})}
							>
								Criar Conta
								<ArrowRight className="h-4 w-4 ml-1.5" />
							</Link>
						</>
						{/* {!userId ? (
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
                <Link
                  href="/"
                  className={buttonVariants({
                    size: "sm",
                    className: "bg-emerald-700",
                  })}
                >
                  <SignUpButton>Get Started</SignUpButton>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </>
            ) : (
              <>
                {subscriptionPlan.isSubscribed ? (
                  <Link
                    href="/dashboard/billing"
                    className={buttonVariants({ size: "sm", variant: "ghost" })}
                  >
                    Pricing
                  </Link>
                ) : (
                  <Link
                    href="/pricing"
                    className={buttonVariants({ size: "sm", variant: "ghost" })}
                  >
                    Upgrade 💎
                  </Link>
                )}
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
            )} */}
					</div>
				</div>
			</MaxWidthWrapper>
		</div>
	);
};

export default Navigation;
