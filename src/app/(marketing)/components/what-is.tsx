import { Icons } from "@/components/icons";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { BookMarked, Hourglass, Telescope } from "lucide-react";

const WhatIs = () => {
	return (
		<div className="bg-white py-20 mt-16 sm:mt-28 flex justify-center items-center">
			<MaxWidthWrapper className="mb-16 relative">
				{/* Title */}
				<div className="flex w-full text-center items-center flex-col justify-center">
					<h1 className="text-5xl mb-5 font-bold text-zinc-700">
						O que é Yapster?
					</h1>
					<p className="text-lg w-96 sm:w-1/2 text-zinc-600">
						Imagine conversar com seus documentos, onde eles revelam segredos e
						respondem às suas perguntas de forma clara e direta.
					</p>
				</div>
				<div className="w-full mt-10 flex flex-col items-start justify-center">
					<h2 className="text-3xl font-semibold text-zinc-600">
						Com o Yapster você pode:
					</h2>
					<div className="grid grid-cols-6 w-full gap-5 mt-10">
						<div className="col-span-6 md:col-span-3 shadow-sm hover:shadow-md border rounded-lg gap-3 flex flex-col items-start justify-center border-zinc-200 bg-zinc-50 p-14">
							<div className="border rounded-full p-2 bg-white">
								<Telescope className="w-5 h-5 text-zinc-600" />
							</div>
							<h3 className="text-lg font-semibold text-emerald-700">
								Dominar qualquer assunto:
							</h3>
							<p>
								Obtenha uma compreensão clara até mesmo dos tópicos mais
								desafiadores por meio de exploração interativa e das respostas
								perspicazes da Dra. Rosalyn.
							</p>
						</div>
						<div className="col-span-6 md:col-span-3 shadow-sm hover:shadow-md border rounded-lg gap-3 flex flex-col items-start justify-center border-zinc-200 bg-zinc-50 p-14">
							<div className="border rounded-full p-2 bg-white">
								<BookMarked className="w-5 h-5 text-zinc-600" />
							</div>
							<h3 className="text-lg font-semibold text-emerald-700">
								Aumente sua retenção de conhecimento:
							</h3>
							<p>
								Conversar com a Dra. Rosalyn solidifica a compreensão e
								transforma a leitura passiva em engajamento ativo.
							</p>
						</div>
						<div className="col-span-6 shadow-sm hover:shadow-md border rounded-lg gap-3 flex flex-col items-start justify-center border-zinc-200 bg-zinc-50 p-14">
							<div className="border rounded-full p-2 bg-white">
								<Hourglass className="w-5 h-5 text-zinc-600" />
							</div>
							<h3 className="text-lg font-semibold text-emerald-700">
								Economize o seu valioso tempo:
							</h3>
							<p>
								Evite a luta para decifrar textos longos e desbloqueie
								rapidamente os principais pontos.
							</p>
						</div>
					</div>
				</div>
				<div className="absolute -top-52 -z-50">
					<Icons.shape className="w-64" />
				</div>
			</MaxWidthWrapper>
			{/* <MaxWidthWrapper className="flex relative items-center justify-start">
				<div className="sm:w-2/3">
					<h1 className="text-5xl py-5 font-bold text-zinc-700">
						O que é Yapster?
					</h1>
					<p className="text-lg text-zinc-600">
						Yapster é uma ferramenta de aprendizado inovadora que combina
						poderosos recursos de resumo com uma interface de conversação. Basta
						fornecer ao Yapster qualquer texto, artigo ou documento, e ele
						criará um resumo conciso e informativo, destacando os pontos
						essenciais.
					</p>
				</div>
				<div className="w-full flex items-center justify-end">
					<Button size="lg" className="bg-emerald-600 w-1/2 py-8">
						Quero Conhecer
					</Button>
				</div>
				<div className="absolute -top-52 -z-50">
					<Icons.shape className="w-64" />
				</div>
				<div className="absolute sm:top-44 top-32 right-24 -z-50">
					<Icons.shape className="w-64" />
				</div>
			</MaxWidthWrapper> */}
		</div>
	);
};

export default WhatIs;
