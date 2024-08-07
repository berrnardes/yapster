import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useContext, useRef } from "react";
import { ChatContext } from "./chat-context";

interface ChatInputProps {
	isDisabled?: boolean;
}

const ChatInput = ({ isDisabled }: ChatInputProps) => {
	const { addMessage, handleInputChange, isLoading, message } =
		useContext(ChatContext);

	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	return (
		<div className="absolute bottom-0 left-0 w-full">
			<div className="mx-2 flex flex-row gap-3 md:mx-4 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
				<div className="relative flex h-full flex-1 items-stretch md:flex-col">
					<div className="relative flex flex-col w-full flex-grow p-4">
						<div className="relative">
							<Textarea
								rows={1}
								ref={textAreaRef}
								autoFocus
								maxRows={4}
								onChange={handleInputChange}
								value={message}
								onKeyDown={(e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault();

										addMessage();

										textAreaRef.current?.focus();
									}
								}}
								placeholder="Digite sua pergunta..."
								className="resize-none pr-12 text-base py-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
							/>
							<Button
								className="absolute bottom-1.5 right-[8px]"
								aria-label="Enviar Mensagem"
								disabled={isLoading || isDisabled}
								onClick={() => {
									addMessage();
									textAreaRef.current?.focus();
								}}
							>
								<Send className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatInput;
