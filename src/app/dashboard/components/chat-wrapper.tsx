"use client";

import { trpc } from "@/app/_trpc/client";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, Loader, XCircle } from "lucide-react";
import Link from "next/link";
import { ChatContextProvider } from "./chat-context";
import ChatInput from "./chat-input";
import Messages from "./messages";

interface ChatWrapperProps {
	fileId: string;
}

const ChatWrapper = ({ fileId }: ChatWrapperProps) => {
	const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
		{
			fileId,
		},
		{
			refetchInterval: (data) =>
				data.state.data?.status === "SUCCESS" ||
				data.state.data?.status === "FAILED"
					? false
					: 500,
		}
	);
	if (isLoading)
		return (
			<div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
				<div className="flex-1 flex justify-center items-center flex-col mb-28">
					<div className="flex items-center flex-col gap-2">
						<Loader className="h-8 w-8 text-zinc-800 animate-spin" />
						<h3 className="font-semibold text-xl text-zinc-800">
							Carregando...
						</h3>
						<p className="text-zinc-400 text-sm">Estou preparando seu PDF</p>
					</div>
				</div>
				<ChatInput isDisabled />
			</div>
		);

	if (data?.status === "FAILED") {
		return (
			<div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
				<div className="flex-1 flex justify-center items-center flex-col mb-28">
					<div className="flex items-center flex-col gap-2">
						<XCircle className="h-8 w-8 text-red-400" />
						<h3 className="font-semibold text-xl text-zinc-800">
							Muitas páginas no documento
						</h3>
						<Link
							href="/dashboard"
							className={buttonVariants({
								variant: "secondary",
								className: "mt-4",
							})}
						>
							<ChevronLeft className="h-3 w-3 mr-1.5" />
							Voltar
						</Link>
					</div>
				</div>
				<ChatInput isDisabled />
			</div>
		);
	}

	return (
		<ChatContextProvider fileId={fileId}>
			<div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
				<div className="flex-1 justify-between flex flex-col mb-28">
					<Messages fileId={fileId} />
				</div>
				<ChatInput isDisabled={isLoading} />
			</div>
		</ChatContextProvider>
	);
};

export default ChatWrapper;
