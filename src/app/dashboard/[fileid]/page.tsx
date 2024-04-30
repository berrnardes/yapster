// import PdfRenderer from "@/components/pdf-renderer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import ChatWrapper from "../components/chat-wrapper";
import PdfRenderer from "../components/pdf-renderer";

interface PageProps {
	params: {
		fileid: string;
	};
}

const Page = async ({ params }: PageProps) => {
	const { fileid } = params;

	const user = await currentUser();

	if (!user || !user.id) {
		redirect(`/auth-callback?origin=dashboard/${fileid}`);
	}

	const file = await db.file.findFirst({
		where: {
			id: fileid,
			userId: user.id,
		},
	});

	if (!file) notFound();

	return (
		<div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.6rem)]">
			<div className="mx-auto hidden w-full max-w-8xl grow lg:flex xl:px-2">
				<div className="flex-1 lg:flex">
					<div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
						<PdfRenderer url={file.url} />
					</div>
				</div>
				<div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
					<ChatWrapper fileId={file.id} />
				</div>
			</div>
			{/* TABS */}
			<Tabs
				defaultValue="file"
				className="w-full flex-col items-center justify-center flex mt-5 lg:hidden"
			>
				<TabsList className="grid text-zinc-900 bg-zinc-300 grid-cols-2 sm:w-96 items-center justify-center w-full">
					<TabsTrigger value="file">Arquivo</TabsTrigger>
					<TabsTrigger value="chat">Chat</TabsTrigger>
				</TabsList>
				<TabsContent value="file">
					<div className="flex-1 lg:flex">
						<div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
							<PdfRenderer url={file.url} />
						</div>
					</div>
				</TabsContent>
				<TabsContent value="chat">
					<div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
						<ChatWrapper fileId={file.id} />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Page;
