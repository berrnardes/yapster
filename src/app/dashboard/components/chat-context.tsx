import { trpc } from "@/app/_trpc/client";
import { useToast } from "@/components/ui/use-toast";
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query";
import { useMutation } from "@tanstack/react-query";
import { ReactNode, createContext, useRef, useState } from "react";

type StreamResponse = {
	addMessage: () => void;
	message: string;
	handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	isLoading: boolean;
};

// CREATING THE CONTEXT AND DEFINING DEFAULT VALUES
export const ChatContext = createContext<StreamResponse>({
	addMessage: () => {},
	message: "",
	handleInputChange: () => {},
	isLoading: false,
});

interface Props {
	fileId: string;
	children: ReactNode;
}

export const ChatContextProvider = ({ children, fileId }: Props) => {
	const [message, setMessage] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const utils = trpc.useUtils();

	const { toast } = useToast();

	const backupMessage = useRef("");

	const { mutate: sendMessage } = useMutation({
		mutationFn: async ({ message }: { message: string }) => {
			const response = await fetch("/api/message", {
				method: "POST",
				body: JSON.stringify({
					fileId,
					message,
				}),
			});

			if (!response) {
				throw new Error("Failed to send message");
			}

			return response.body;
		},
		onMutate: async ({ message }) => {
			backupMessage.current = message;
			setMessage("");

			await utils.getFileMessages.cancel();

			const previousMessages = utils.getFileMessages.getInfiniteData();

			utils.getFileMessages.setInfiniteData(
				{
					fileId,
					limit: INFINITE_QUERY_LIMIT,
				},
				(old) => {
					if (!old) {
						return {
							pages: [],
							pageParams: [],
						};
					}
					let newPages = [...old.pages];

					let latestPage = newPages[0]!;

					latestPage.messages = [
						{
							createdAt: new Date().toISOString(),
							id: crypto.randomUUID(),
							text: message,
							isUserMessage: true,
						},
						...latestPage.messages,
					];
					newPages[0] = latestPage;

					return {
						...old,
						pages: newPages,
					};
				}
			);
			setIsLoading(true);

			return {
				previousMessages:
					previousMessages?.pages.flatMap((page) => page.messages) ?? [],
			};
		},
		onSuccess: async (stream) => {
			setIsLoading(false);

			if (!stream) {
				return toast({
					title: "Estou com problema pra enviar essa mensagem",
					description: "Por favor recarregue a página e tente de novo",
					variant: "destructive",
				});
			}

			const reader = stream.getReader();
			const decoder = new TextDecoder();
			let done = false;

			// ACCUMULATTED RESPONSE
			let accResponse = "";

			while (!done) {
				const { value, done: doneReading } = await reader.read();
				done = doneReading;
				const chunkValue = decoder.decode(value);

				// accResponse += chunkValue;
				const matches = chunkValue.match(/(?<=")(.*?)(?=")/g);
				if (matches) {
					accResponse += matches.join("");
				}

				utils.getFileMessages.setInfiniteData(
					{ fileId, limit: INFINITE_QUERY_LIMIT },
					(old) => {
						if (!old) return { pages: [], pageParams: [] };

						let isAiResponseCreated = old.pages.some((page) =>
							page.messages.some((message) => message.id === "ai-response")
						);

						let updatedPages = old.pages.map((page) => {
							if (page === old.pages[0]) {
								let updatedMessages;

								if (!isAiResponseCreated) {
									updatedMessages = [
										{
											createdAt: new Date().toISOString(),
											id: "ai-response",
											text: accResponse,
											isUserMessage: false,
										},
										...page.messages,
									];
								} else {
									updatedMessages = page.messages.map((message) => {
										if (message.id === "ai-response") {
											return {
												...message,
												text: accResponse,
											};
										}
										return message;
									});
								}
								return {
									...page,
									messages: updatedMessages,
								};
							}
							return page;
						});
						return { ...old, pages: updatedPages };
					}
				);
			}
		},
		onError: (_, __, context) => {
			setMessage(backupMessage.current);
			utils.getFileMessages.setData(
				{ fileId },
				{ messages: context?.previousMessages ?? [] }
			);
		},
		onSettled: async () => {
			setIsLoading(false);
			await utils.getFileMessages.invalidate({ fileId });
		},
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value);
	};

	const addMessage = () => sendMessage({ message });

	return (
		<ChatContext.Provider
			value={{ addMessage, message, handleInputChange, isLoading }}
		>
			{children}
		</ChatContext.Provider>
	);
};
