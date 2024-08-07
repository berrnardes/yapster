"use client";

import { UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MobileNav = ({
	isAuth,
	isSubscribed,
}: {
	isAuth: boolean;
	isSubscribed: boolean;
}) => {
	const [isOpen, setOpen] = useState<boolean>(true);

	const pathname = usePathname();
	const toggleOpen = () => setOpen((prev) => !isOpen);

	useEffect(() => {
		if (isOpen) toggleOpen();
	}, [pathname]);

	const closeOnCurrent = (href: string) => {
		if (pathname === href) {
			toggleOpen();
		}
	};

	return (
		<div className="sm:hidden">
			{!isOpen ? (
				<Menu
					onClick={toggleOpen}
					className="relative z-50 h-5 w-5 cursor-pointer text-zinc-900"
				/>
			) : (
				<X
					onClick={toggleOpen}
					className="relative z-50 h-5 w-5 cursor-pointer text-zinc-900"
				/>
			)}
			{isOpen ? (
				<div className="fixed animate-in transition-all bg-white slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full">
					<ul className="absolute border-b bg-white border-zinc-200 shadow-xl grid w-full gap-3 px-10 pt-14 pb-8">
						{!isAuth ? (
							<>
								<li>
									<Link
										href="/sign-up"
										onClick={() => closeOnCurrent("/sign-up")}
										className="flex items-center w-full text-emerald-700 font-semibold"
									>
										Criar Conta
									</Link>
								</li>
								<li className="my-3 h-[1px] w-full bg-zinc-200" />
								<li>
									<Link
										href="/sign-in"
										onClick={() => closeOnCurrent("/sign-in")}
										className="flex items-center w-full font-semibold"
									>
										Entrar
									</Link>
								</li>
								<li className="my-3 h-[1px] w-full bg-zinc-200" />
								<li>
									<Link
										href="/pricing"
										onClick={() => closeOnCurrent("/pricing")}
										className="flex items-center w-full  font-semibold"
									>
										Preços
									</Link>
								</li>
							</>
						) : (
							<>
								<li>
									<div className="flex items-center w-full font-semibold">
										<UserButton afterSignOutUrl="/" />
									</div>
								</li>
								<li className="my-3 h-px w-full bg-zinc-200" />
								<li>
									<Link
										href="/dashboard/billing"
										onClick={() => closeOnCurrent("/dashboard/billing")}
										className="flex items-center w-full font-semibold"
									>
										{isSubscribed ? <p>Seu Plano</p> : <p>💎 Upgrade</p>}
									</Link>
								</li>
								<li className="my-3 h-px w-full bg-zinc-200" />
								<li>
									<Link
										href="/dashboard"
										onClick={() => closeOnCurrent("/dashboard")}
										className="flex items-center w-full font-semibold"
									>
										Dashboard
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			) : null}
		</div>
	);
};

export default MobileNav;
