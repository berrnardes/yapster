import Gertrude from "@/components/icons/gertude";
import { cn } from "@/lib/utils";
import { ExtendedMessage } from "@/types/message";
import { format } from "date-fns";
import { User } from "lucide-react";
import { forwardRef } from "react";
import ReactMarkdown from "react-markdown";

interface MessageProps {
	message: ExtendedMessage;
	isNextMessageSamePerson: boolean;
}

const Message = forwardRef<HTMLDivElement, MessageProps>(
	({ message, isNextMessageSamePerson }, ref) => {
		return (
			<div
				ref={ref}
				className={cn("flex items-end", {
					"justify-end": message.isUserMessage,
				})}
			>
				<div
					className={cn(
						"relative flex h-6 w-6 aspect-square items-center justify-center",
						{
							"order-2 bg-emerald-400 rounded-sm": message.isUserMessage,
							"order-1 bg-white rounded-sm": !message.isUserMessage,
							// invisible: isNextMessageSamePerson,
						}
					)}
				>
					{message.isUserMessage ? (
						<User className="fill-white text-white h-3/4 w-3/4" />
					) : (
						<Gertrude className="fill-zinc-300 text-zinc-100 h-10 w-10" />
					)}
				</div>

				<div
					className={cn("flex flex-col space-y-2 text-base max-w-md mx-2", {
						"order-1 items-end": message.isUserMessage,
						"order-2 items-start": !message.isUserMessage,
					})}
				>
					<div
						className={cn("px-2 py-1.5 rounded-lg inline-block", {
							"bg-emerald-400 text-white": message.isUserMessage,
							"bg-gray-200 text-gray-900": !message.isUserMessage,
							"rounded-br-none":
								!isNextMessageSamePerson && message.isUserMessage,
							"rounded-bl-none":
								!isNextMessageSamePerson && !message.isUserMessage,
						})}
					>
						{typeof message.text === "string" ? (
							<ReactMarkdown
								className={cn("prose", {
									"text-zinc-50": message.isUserMessage,
								})}
							>
								{message.text}
							</ReactMarkdown>
						) : (
							message.text
						)}
						{message.id !== "loading-message" ? (
							<div
								className={cn("text-sm select-none mt-1 w-full text-right", {
									"text-zinc-700": !message.isUserMessage,
									"text-white": message.isUserMessage,
								})}
							>
								{format(new Date(message.createdAt), "HH:mm")}
							</div>
						) : null}
					</div>
				</div>
			</div>
		);
	}
);

Message.displayName = "Message";

export default Message;
