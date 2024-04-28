import Shape from "@/components/icons/shape";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Image from "next/image";

const Target = () => {
	return (
		<div className="bg-emerald-50 py-20 mb-16 flex justify-center items-center">
			<MaxWidthWrapper className="relative">
				{/* Title */}
				<div className="flex w-full text-center items-start flex-col justify-start">
					<h1 className="text-4xl sm:text-5xl mb-5 font-bold text-zinc-700">
						Yapster é ideal para:
					</h1>
				</div>
				<div className="w-full mt-10 flex flex-col items-start justify-center">
					<div className="grid grid-cols-6 w-full gap-5 mt-10">
						<div className="col-span-6 md:col-span-2 sm:col-span-3 rounded-lg gap-3 flex flex-col items-center border justify-center border-emerald-200 bg-white h-[450px]">
							<div className="p-5 w-full h-full flex items-center justify-center">
								<Image
									src="/student.svg"
									width={250}
									height={250}
									alt="Student"
									className="rounded-t-lg"
								/>
							</div>
							<div className="flex flex-col gap-3 border-t px-5 py-10">
								<h3 className="text-lg font-bold text-zinc-700">Estudantes</h3>
								<p>
									Cumpra tarefas complexas e aprofunde seu conhecimento em
									qualquer disciplina.
								</p>
							</div>
						</div>
						<div className="col-span-6 md:col-span-2 sm:col-span-3 rounded-lg gap-3 flex flex-col items-center border justify-center border-emerald-200 bg-white h-[450px]">
							<div className="p-5 w-full h-full flex items-center justify-center">
								<Image
									src="/professional.svg"
									width={250}
									height={250}
									alt="Student"
									className="rounded-t-lg"
								/>
							</div>
							<div className="flex flex-col gap-3 border-t px-5 py-10">
								<h3 className="text-lg font-bold text-zinc-700">
									Profissionais
								</h3>
								<p>
									Mantenha-se informado em sua área extraindo pontos-chave de
									artigos e trabalhos de pesquisa com eficiência.
								</p>
							</div>
						</div>
						<div className="col-span-6 md:col-span-2 sm:col-span-6 rounded-lg gap-3 flex flex-col items-center border justify-center border-emerald-200 bg-white h-[450px]">
							<div className="p-5 w-full h-full flex items-center justify-center">
								<Image
									src="/self-taugth.svg"
									width={250}
									height={250}
									alt="Student"
									className="rounded-t-lg"
								/>
							</div>
							<div className="flex flex-col gap-3 border-t px-5 py-10">
								<h3 className="text-lg font-bold text-zinc-700">Autoditadas</h3>
								<p>
									Explore novas áreas de interesse e satisfaça sua curiosidade
									intelectual de maneira divertida e interativa.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="absolute -top-52 right-0 hidden sm:block">
					<Shape className="w-64" />
				</div>
			</MaxWidthWrapper>
		</div>
	);
};

export default Target;
