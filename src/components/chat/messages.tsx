import { trpc } from "@/app/_trpc/client";
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query";
import { useIntersection } from "@mantine/hooks";
import { Loader } from "lucide-react";
import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "./chat-context";

interface MessagesProps {
	fileId: string;
}

const Messages = ({ fileId }: MessagesProps) => {
	const { isLoading: isAiThinking } = useContext(ChatContext);

	const { data, isLoading, fetchNextPage } =
		trpc.getFileMessages.useInfiniteQuery(
			{
				fileId,
				limit: INFINITE_QUERY_LIMIT,
			},
			{
				getNextPageParam: (lastPage) => lastPage?.nextCursor,
				placeholderData: (previousData) => previousData,
			}
		);

	const messages = data?.pages.flatMap((page) => page.messages);

	const loadingMessage = {
		createdAt: new Date().toISOString,
		id: "loading-message",
		isUserMessage: false,
		text: (
			<span className="flex h-full items-center justify-center">
				<Loader className="h-4 w-4 animate-spin" />
			</span>
		),
	};

	const combinedMessages = {
		...(isAiThinking ? [loadingMessage] : []),
		...(messages ?? []),
	};

	const lastMessageRef = useRef<HTMLDivElement>(null);

	const { ref, entry } = useIntersection({
		root: lastMessageRef.current,
		threshold: 1,
	});

	useEffect(() => {
		if (entry?.isIntersecting) {
			fetchNextPage();
		}
	}, [entry, fetchNextPage]);

	return (
		<div className="flex max-h-[calc(100vh-3.5rem-7rem)] border-zinc-200 flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"></div>
	);
};

export default Messages;
