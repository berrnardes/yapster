"use client";

import { Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from "../../../components/ui/dialog";
import UploadDropzone from "./upload-dropzone";

const UploadButton = ({ isSubscribed }: { isSubscribed: boolean }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	return (
		<Dialog
			open={isOpen}
			onOpenChange={(v) => {
				if (!v) {
					setIsOpen(v);
				}
			}}
		>
			<DialogTrigger onClick={() => setIsOpen(true)} asChild>
				<Button
					variant="outline"
					className="shadow-sm text-sm bg-emerald-600 text-white"
				>
					<span className="">Upload</span>
					<Upload className="h-5 w-5 ml-2" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<UploadDropzone isSubscribed={isSubscribed} />
			</DialogContent>
		</Dialog>
	);
};

export default UploadButton;
