import Footer from "@/components/footer";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
// import UpgradeButton from "@/components/upgrade-button";
import { PLANS } from "@/config/stripe";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight, Check, HelpCircle, Minus } from "lucide-react";
import Link from "next/link";

const PricingPage = () => {
	const { userId } = auth();
	const pricingItems = [
		{
			plan: "Gratuito",
			tagline: "Para pequenas leituras pessoais.",
			quota: 5,
			features: [
				{
					text: "15 páginas por PDF",
					footnote: "Tamanho máximo de páginas por arquivo",
				},
				{
					text: "4MB de tamanho limite",
					footnote: "O tamanho máximo por arquivo em MB",
				},
				{
					text: "Interface responsiva",
				},
				{
					text: "Respostas com a melhor qualidade",
					footnote:
						"Algoritmo ajustado para oferecer a melhor resposta possível",
					negative: true,
				},
				{
					text: "Suporte Prioritário",
					negative: true,
				},
			],
		},
		{
			plan: "Pro",
			tagline: "Para grandes projetos e pesquisa.",
			quota: PLANS.find((p) => p.slug === "pro")!.quota,
			features: [
				{
					text: "200 páginas por PDF",
					footnote: "Tamanho máximo de páginas por arquivo.",
				},
				{
					text: "20MB de tamanho limite",
					footnote: "O tamanho máximo por arquivo em MB.",
				},
				{
					text: "Interface responsiva",
				},
				{
					text: "Respostas com a melhor qualidade",
					footnote:
						"Algoritmo ajustado para oferecer a melhor resposta possível",
				},
				{
					text: "Suporte Prioritáro",
				},
			],
		},
	];

	return (
		<>
			<MaxWidthWrapper className="mb-16 mt-24 text-center max-w-5xl">
				<div className="mx-auto mb-10 sm:max-w-lg">
					<h1 className="text-5xl font-bold sm:text-6xl text-zinc-800">
						Planos <span className="text-emerald-700">&</span> Preços
					</h1>
					<p className="mt-5 text-zinc-600 sm:text-lg">
						Comece a aprender hoje e libere o verdadeiro potencial do
						aprendizado
					</p>
				</div>
				<div className="pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
					<TooltipProvider>
						{pricingItems.map(({ features, plan, quota, tagline }) => {
							const price =
								PLANS.find((p) => p.slug === plan.toLowerCase())?.price
									.amount || 0;

							return (
								<div
									key={plan}
									className={cn("relative rounded-2xl bg-white shadow-lg", {
										"border border-emerald-500 shadow-emerald-200":
											plan === "Pro",
										"border border-zinc-200": plan !== "Pro",
									})}
								>
									{plan === "Pro" && (
										<div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-emerald-700 to-green-500 px-3 py-2 text-sm font-medium text-white">
											Comece agora
										</div>
									)}

									<div className="p-5">
										<h3 className="my-3 text-center font-display text-3xl font-bold">
											{plan}
										</h3>
										<p className="text-zinc-500">{tagline}</p>
										<p className="my-5 text-zinc-800 font-display text-5xl font-semibold">
											R${price}
										</p>
										<p className="text-zinc-500">/mês</p>
									</div>
									<div className="flex h-20 items-center justify-center border-b border-t border-zinc-300 bg-zinc-50">
										<div className="flex items-center space-x-1">
											<p>{quota.toLocaleString()} PDFs/mês incluido</p>
											<Tooltip delayDuration={300}>
												<TooltipTrigger className="cursor-default ml-1.5 ">
													<HelpCircle className="h-4 w-4 text-emerald-700" />
												</TooltipTrigger>
												<TooltipContent className="w-80 p-2 ">
													Quantidade de PDFs disponíveis para você fazer o
													upload no mês
												</TooltipContent>
											</Tooltip>
										</div>
									</div>
									<ul className="my-10 space-y-5 px-8">
										{features.map(({ text, footnote, negative }) => (
											<li key={text} className="space-x-5 flex">
												<div className="flex-shrink-0">
													{negative ? (
														<Minus className="h-6 w-6 text-zinc-300" />
													) : (
														<Check className="h-6 w-6 text-emerald-700" />
													)}
												</div>
												{footnote ? (
													<div className="flex items-center space-x-1">
														<p
															className={cn("text-zinc-400", {
																"text-zinc-600": negative,
															})}
														>
															{text}
														</p>
														<Tooltip delayDuration={300}>
															<TooltipTrigger className="cursor-default ml-1.5 ">
																<HelpCircle className="h-4 w-4 text-emerald-700" />
															</TooltipTrigger>
															<TooltipContent className="w-80 p-2 ">
																{footnote}
															</TooltipContent>
														</Tooltip>
													</div>
												) : (
													<p
														className={cn("text-zinc-400", {
															"text-zinc-600": negative,
														})}
													>
														{text}
													</p>
												)}
											</li>
										))}
									</ul>
									<div className="border-t border-zinc-200" />
									<div className="p-5">
										{plan === "Free" ? (
											<Link
												href={userId ? "/dashboard" : "/sign-in"}
												className={buttonVariants({
													className: "w-full",
													variant: "secondary",
												})}
											>
												{userId ? "Upgrade now" : "Criar Conta"}
												<ArrowRight className="h-5 w-5 ml-1.5" />
											</Link>
										) : userId ? (
											// TODO: Upgrade Button
											<p>Upgrade Button</p>
										) : (
											// <UpgradeButton />
											<Link
												href="/sign-in"
												className={buttonVariants({
													className: "w-full",
												})}
											>
												{userId ? "Upgrade now" : "Criar Conta"}
												<ArrowRight className="h-5 w-5 ml-1.5" />
											</Link>
										)}
									</div>
								</div>
							);
						})}
					</TooltipProvider>
				</div>
			</MaxWidthWrapper>
			<Footer />
		</>
	);
};

export default PricingPage;
