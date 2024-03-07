"use client";

import { Cloud, File, Upload } from "lucide-react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Progress } from "./ui/progress";

const UploadDropzone = () => {
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [uploadProgress, setUploadProgress] = useState<number>(0);

	const startSimulatedProgress = () => {
		setUploadProgress(0);

		const interval = setInterval(() => {
			setUploadProgress((prevProgress) => {
				if (prevProgress >= 95) {
					clearInterval(interval);
					return prevProgress;
				}
				return prevProgress + 5;
			});
		}, 500);

		return interval;
	};
	return (
		<Dropzone
			multiple={false}
			onDrop={async (acceptedFiles) => {
				setIsUploading(true);

				const progressInterval = startSimulatedProgress();
			}}
		>
			{({ getRootProps, getInputProps, acceptedFiles }) => (
				<div
					{...getRootProps()}
					className="border h-64 m-4 border-dashed border-zinc-400 rounded-lg"
				>
					<div className="flex items-center justify-center w-full ">
						<label
							htmlFor="dropzone-file"
							className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-zinc-100 hover:bg-zinc-200"
						>
							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<Cloud className="h-6 w-6 mb-2" />
								<p className="mb-2 text-sm">
									<span className="font-semibold">Click to upload</span> or drag
									and drop
								</p>
								<p className="text-sm text-zinc-600">PDF up to 4mb</p>
							</div>
							{acceptedFiles && acceptedFiles[0] ? (
								<div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
									<div className="px-3 py-2 h-full grid place-items-center">
										<File className="h-4 w-4 text-blue-600" />
									</div>
									<div className="px-3 py-2 h-full text-sm truncate">
										{acceptedFiles[0].name}
									</div>
								</div>
							) : null}
							{isUploading ? (
								<div className="w-full mt-4 max-w-xs mx-auto">
									<Progress
										value={uploadProgress}
										className="h-1 w-full bg-zinc-200"
									/>
								</div>
							) : null}
							<input
								{...getInputProps}
								type="file"
								id="dropzone-fiel"
								className="hidden"
							/>
						</label>
					</div>
				</div>
			)}
		</Dropzone>
	);
};

const UploadButton = () => {
	const [isOpen, setOpen] = useState<boolean>(false);
	return (
		<Dialog
			open={isOpen}
			onOpenChange={(v) => {
				if (!v) {
					setOpen(v);
				}
			}}
		>
			<DialogTrigger onClick={() => setOpen(true)} asChild>
				<Button variant="outline" className="border-zinc-700">
					<span className="sm:block hidden">Upload PDF</span>
					<Upload className="sm:hidden block w-5 h-5" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<UploadDropzone />
			</DialogContent>
		</Dialog>
	);
};

export default UploadButton;
