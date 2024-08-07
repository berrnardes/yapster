"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Expand, Loader2 } from "lucide-react";
import { useState } from "react";
import { Document, Page } from "react-pdf";
import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";

interface PdfFullscreenProps {
	fileUrl: string;
}

const PdfFullscreen = ({ fileUrl }: PdfFullscreenProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [numPages, setNumPages] = useState<number>();

	const { ref, width } = useResizeDetector();

	const { toast } = useToast();

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(v) => {
				if (!v) setIsOpen(v);
			}}
		>
			<DialogTrigger onClick={() => setIsOpen(true)} asChild>
				<Button
					variant="ghost"
					aria-label="fullscreen"
					className="gap-1.5 text-zinc-600"
				>
					<Expand className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-7xl w-full">
				<SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)] mt-6">
					<div ref={ref}>
						<Document
							loading={
								<div className="flex justify-center">
									<Loader2 className="my-24 w-6 h-6 animate-spin" />
								</div>
							}
							onLoadError={() => {
								toast({
									title: "Error Loading PDF",
									description: "Please try again",
									variant: "destructive",
								});
							}}
							onLoadSuccess={({ numPages }) => {
								setNumPages(numPages);
							}}
							file={fileUrl}
							className="max-w-full"
						>
							{new Array(numPages).fill(0).map((_, i) => (
								<Page key={i} width={width ? width : 1} pageNumber={i + 1} />
							))}
						</Document>
					</div>
				</SimpleBar>
			</DialogContent>
		</Dialog>
	);
};

export default PdfFullscreen;
