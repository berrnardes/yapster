import MaxWidthWrapper from "@/components/max-width-wrapper";

import Image from "next/image";
import Link from "next/link";

const Instructions = () => {
	return (
		<MaxWidthWrapper className="mb-16 mt-16 sm:mt-28">
			{/* FEATURE SECTION */}
			<div className="mb-12 px-6 lg:px-8">
				<div className="mx-auto max-w-2xl sm:text-center">
					<h2 className="text-4xl sm:text-5xl mb-5 mt-2 font-bold text-zinc-700">
						Comece a usar em minutos
					</h2>
					<p className="mt-4 sm:text-lg text-zinc-600">
						O Yapster transforma a maneira como você interage com as
						informações.
					</p>
				</div>
			</div>

			{/* STEPS */}
			<ol className="my-8 mx-4 space-y-4 pt-8 md:space-x-0 md:space-y-12">
				<li className="md:flex-1">
					<div className="flex flex-col space-y-2 border-l-4 border-zinc-400 py-2 pl-4 md:border-l-0 md:border-t-2 md:pl-0 md:pb-0 md:pt-4">
						<span className="font-medium text-emerald-700 text-sm">
							PASSO 1:
						</span>
						<span className="font-semibold text-xl text-zinc-700">
							Crie um cadastro
						</span>
						<span className="mt-2 text-zinc-700">
							Podendo usar tanto o plano gratuito, quanto o plano{" "}
							<Link
								href="/pricing"
								className="text-emerald-700 underline underline-offset-2"
							>
								Pro.
							</Link>
						</span>
					</div>
				</li>
				<li className="md:flex-1">
					<div className="flex flex-col space-y-2 border-l-4 border-zinc-400 py-2 pl-4 md:border-l-0 md:border-t-2 md:pl-0 md:pb-0 md:pt-4">
						<span className="font-medium text-emerald-700 text-sm">
							PASSO 2:
						</span>
						<span className="font-semibold text-xl text-zinc-700">
							Carregue seu documento
						</span>
						<span className="mt-2 text-zinc-700">
							Vamos processar o seu arquivo e deixar ele pronto para você
							começar a conversar.
						</span>
					</div>
				</li>
				<li className="md:flex-1">
					<div className="flex flex-col space-y-2 border-l-4 border-zinc-400 py-2 pl-4 md:border-l-0 md:border-t-2 md:pl-0 md:pb-0 md:pt-4">
						<span className="font-medium text-emerald-700 text-sm">
							PASSO 3:
						</span>
						<span className="font-semibold text-xl text-zinc-700">
							Comece as perguntas
						</span>
						<span className="mt-2 text-zinc-700">
							Simples assim. Tudo isso em menos de 1 minuto.
						</span>
					</div>
				</li>
			</ol>
			{/* FILE UPLOAD PREVIEW */}
			<div className="px-6">
				<div className="mt-16 flow-root sm:mt-24">
					<div className="-m-2 rounded-xl ring-1 bg-zinc-900/5 p-2 ring-inset ring-zinc-900/10 lg:-m-4 lg:rounded-2xl lg:p-3">
						<Image
							src="/file-upload-preview.jpg"
							alt="File Upload Preview"
							width={1419}
							height={732}
							quality={100}
							className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-zinc-900/10"
						/>
					</div>
				</div>
			</div>
		</MaxWidthWrapper>
	);
};

export default Instructions;
