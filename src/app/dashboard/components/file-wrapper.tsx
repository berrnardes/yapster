"use client";

import { useMediaQuery } from "react-responsive";
import ChatWrapper from "./chat-wrapper";
import PdfRenderer from "./pdf-renderer";

interface FileWrapperProps {
	url: string;
	id: string;
}

const FileWrapper = ({ url, id }: FileWrapperProps) => {
	const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
	console.log(isDesktop);

	return (
		<div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
			{isDesktop ? (
				<div className="">
					<div className="flex-1 xl:flex">
						<div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
							<PdfRenderer url={url} />
						</div>
					</div>
					<div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
						<ChatWrapper fileId={id} />
					</div>
				</div>
			) : null}
		</div>
	);
};

export default FileWrapper;
