import { trpc } from "@/app/_trpc/client";
import { useUploadThing } from "@/lib/uploadthing";
import { File, Loader2, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { Progress } from "../ui/progress";
import { useToast } from "../ui/use-toast";

const UploadDropzone = () => {
	const router = useRouter();
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [uploadProgress, setUploadProgress] = useState<number>(0);

	const { toast } = useToast();

	console.log("BEFORE UPLOADTHING");
	const { startUpload } = useUploadThing("freePlanUploader");
	console.log("BEFORE UPLOADTHING");

	const { mutate: startPolling } = trpc.getFile.useMutation({
		onSuccess: (file) => {
			router.push(`/dashboard/${file.id}`);
		},
		retry: true,
		retryDelay: 500,
	});

	const startSimulatedProgress = () => {
		setUploadProgress(0);

		const interval = setInterval(() => {
			setUploadProgress((prev) => {
				if (prev >= 95) {
					clearInterval(interval);
					return prev;
				}
				return prev + 5;
			});
		}, 1000);

		return interval;
	};

	return (
		<Dropzone
			multiple={false}
			onDrop={async (acceptedFiles) => {
				setIsUploading(true);

				const progressInterval = startSimulatedProgress();

				// Handle the file uploading
				const res = await startUpload(acceptedFiles);

				if (!res) {
					return toast({
						title: "Algo deu errado",
						description: "Por favor tente de novo!!!",
						variant: "destructive",
					});
				}

				const [fileResponse] = res;

				const key = fileResponse?.key;

				if (!key) {
					return toast({
						title: "Algo deu errado",
						description: "Por favor tente de novo!!!",
						variant: "destructive",
					});
				}

				clearInterval(progressInterval);
				setUploadProgress(100);
				console.log("File uploaded");
				startPolling({ key });
			}}
		>
			{({ getRootProps, getInputProps, acceptedFiles }) => (
				<div
					{...getRootProps()}
					className="border h-64 m-4 border-dashed rounded-lg border-zinc-400"
				>
					<div className="flex items-center h-full w-full justify-center">
						<label
							className="flex flex-col items-center justify-center h-full w-full rounded-lg cursor-pointer bg-zinc-50 hover:bg-zinc-100"
							htmlFor="dropzone-file"
						>
							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<UploadCloud className="mb-2 h-6 w-6 text-zinc-600" />
								<p className="mb-2 text-sm text-zinc-700">
									<span className="font-semibold">Clique </span>
									ou arrasta e solta
								</p>
								<p className="text-sm text-zinc-600">PDF até 4MB</p>
							</div>
							{acceptedFiles && acceptedFiles[0] ? (
								<div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
									<div className="px-3 py-2 h-full grid place-items-center">
										<File className="h-4 w-4 text-blue-500" />
									</div>
									<div className="px-3 py-2 h-full text-sm truncate">
										{acceptedFiles[0].name}
									</div>
								</div>
							) : null}
							{isUploading ? (
								<div className="w-full mt-4 max-w-xs mx-auto">
									<Progress
										indicatorColor={
											uploadProgress === 100 ? "bg-green-600" : ""
										}
										value={uploadProgress}
										className="h-1 w-full bg-zinc-200"
									/>
									{uploadProgress === 100 ? (
										<div className="flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2">
											<Loader2 className="h-3 w-3 animate-spin" />
											Redirecionando...
										</div>
									) : null}
								</div>
							) : null}
						</label>
					</div>
					<input
						{...getInputProps()}
						type="file"
						id="dropzone-file"
						className="hidden"
					/>
				</div>
			)}
		</Dropzone>
	);
};

export default UploadDropzone;