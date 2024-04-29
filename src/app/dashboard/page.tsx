"use client";

import { trpc } from "@/app/_trpc/client";
import BoringAvatar from "@/components/icons/boring-avatar";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar, MessageSquare, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Dashboard = () => {
	const utils = trpc.useUtils();

	const { data: files, isLoading } = trpc.getUserFiles.useQuery();
	console.log(files);

	return (
		<MaxWidthWrapper className="md:pt-10 pt-5">
			<div className="flex flex-col gap-4 border-b border-zinc-200 pb-5 sm:flex-row sm:items-center sm:gap-0 items-start justify-between">
				<h1 className="text-4xl sm:text-5xl font-bold mb-3 text-zinc-900">
					Meus Documentos
				</h1>
				{/* UPLOAD BUTTON */}

				{/* <UploadButton /> */}
			</div>
			{files && files.length !== 0 ? (
				<ul className="mt-8 grid grid-cols-2 gap-6 divide-y divide-zinc-400 md:grid-cols-2 lg:grid-cols-3">
					{files
						.sort(
							(a, b) =>
								new Date(b.createdAt).getTime() -
								new Date(a.createdAt).getTime()
						)
						.map((file) => (
							<li
								key={file.id}
								className="col-span-1 divide-y divide-zinc-200 rounded-md bg-white transition shadow hover:shadow-lg"
							>
								<Link
									className="flex flex-col gap-2"
									href={`/dashboard/${file.id}`}
								>
									<div className="pt-5 px-5 flex w-full  rounded-lg items-center justify-between space-x-6">
										<div className="h-14 w-14 flex flex-shrink-0 rounded-md bg-zinc-600 items-center justify-center">
											{/* TODO: Become dynamic icon when a document is created */}
											<BoringAvatar.mary_baker />
										</div>
										<div className="flex-1 truncate">
											<div className="flex items-center space-x-3">
												<h3 className="truncate text-lg font-medium text-zinc-900">
													{file.name}
												</h3>
											</div>
										</div>
									</div>
								</Link>
								<div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
									<div className="flex items-center gap-2">
										<Calendar className="w-4 h-4" />
										{format(new Date(file.createdAt), "dd/MM/yy")}
									</div>
									<div className="flex items-center gap-2">
										<MessageSquare className="h-4 w-4" />
										mocked
									</div>

									{/* TODO DELETE FUNCTION */}
									<Button className="w-full" variant="destructive" size="sm">
										<Trash className="h-4 w-4" />
									</Button>
								</div>
							</li>
						))}
				</ul>
			) : isLoading ? (
				<div>
					<Skeleton count={3} height={100} className="my-3" />
				</div>
			) : (
				<div className="mt-16 flex flex-col items-center gap-4">
					<Image
						src="empty-folder.svg"
						height={100}
						width={100}
						className="h-52 w-52 sm:h-64 sm:w-64"
						alt="Empty Folder"
					/>
					<h3 className="text-2xl font-semibold">Parece Vazio Por aqui</h3>
					<p className="text-zinc-700">
						Vamos começar carregando seu primeiro arquivo
					</p>
					<Button>Upload</Button>
				</div>
			)}
		</MaxWidthWrapper>
	);
};

export default Dashboard;
