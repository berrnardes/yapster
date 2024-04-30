import LineIcon from "@/components/icons/line";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
	return (
		<>
			<MaxWidthWrapper className="mb-12 sm:mt-20 mt-16 flex justify-center items-center flex-col text-center">
				<div className="border mx-auto mb-16 max-w-fit flex justify-center items-center space-x-2 overflow-hidden rounded-full border-gray-300 bg-white px-7 py-3 shadow-sm transition-all hover:border-gray-300 hover:bg-white/50 hover:shadow-md">
					<p className="text-sm text-zinc-700">
						<span className="font-semibold">Yapster</span> tá online! 😎
					</p>
				</div>

				<h1 className="text-zinc-800 max-w-sm sm:mt-5 text-5xl font-bold sm:text-6xl lg:text-7xl sm:max-w-4xl uppercase">
					Converse Com Seus <span className="text-primary">Documentos</span>
				</h1>
				<LineIcon className="w-80 sm:w-96 lg:w-[500px]" />
				<p className="mt-5 max-w-prose sm:text-lg text-zinc-600">
					<span className="font-semibold">
						Sofrendo com excesso de informações?
					</span>{" "}
					Yapster é a sua solução completa para dominar tópicos complexos e
					obter informações importantes.
				</p>
				<Link
					href="/dashboard"
					target="_blank"
					className={buttonVariants({
						size: "lg",
						className: "mt-12 py-7 px-11",
					})}
				>
					Começar Agora
				</Link>
			</MaxWidthWrapper>
			<div>
				<div className="relative isolate">
					<div>
						<div className="mx-auto max-w-6xl px-6 lg:px-8">
							<div className="mt-16 mb-20 flow-root sm:mt-24">
								<div className="-m-2 rounded-md bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-xl lg:p-3">
									<Image
										src="/dashboard-preview.jpg"
										alt="product preview"
										width={1364}
										height={866}
										quality={100}
										className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
										priority={true}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Hero;
