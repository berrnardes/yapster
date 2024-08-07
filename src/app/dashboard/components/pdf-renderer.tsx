"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	ChevronDown,
	ChevronUp,
	Loader2,
	RotateCw,
	ZoomIn,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";
import { z } from "zod";
import PdfFullscreen from "./pdf-fullscreen";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfRendererProps {
	url: string;
}

const PdfRenderer = ({ url }: PdfRendererProps) => {
	const { ref, width } = useResizeDetector();
	// States
	const [numPages, setNumpages] = useState<number>();
	const [currPage, setCurrPage] = useState<number>(1);
	const [scale, setScale] = useState<number>(1);
	const [rotation, setRotation] = useState<number>(0);
	const [renderedScale, setRenderedScale] = useState<number | null>(null);

	const isLoading = renderedScale !== scale;

	const CustomPageValidator = z.object({
		page: z
			.string()
			.refine((num) => Number(num) > 0 && Number(num) <= numPages!),
	});

	const { toast } = useToast();

	type TCustomPageValidator = z.infer<typeof CustomPageValidator>;

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<TCustomPageValidator>({
		defaultValues: {
			page: "1",
		},
		resolver: zodResolver(CustomPageValidator),
	});

	const handlePageSubmit = ({ page }: TCustomPageValidator) => {
		setCurrPage(Number(page));
		setValue("page", String(page));
	};

	return (
		<div className="w-full bg-white rounded-md shadow flex flex-col items-center">
			<div className="h-14 w-full border-b border-zinc-200 flex justify-between items-center px-2">
				{/* Buttons */}
				<div className="flex items-center gap-0 border rounded-sm sm:gap-1.5">
					<Button
						variant="ghost"
						disabled={numPages === undefined || currPage === numPages}
						onClick={() => {
							setCurrPage((prev) =>
								prev + 1 > numPages! ? numPages! : prev + 1
							);
							setValue("page", String(currPage + 1));
						}}
						aria-label="next page"
					>
						<ChevronDown className="h-4 w-4" />
					</Button>
					<div className="flex items-center gap-0 sm:gap-1.5">
						<Input
							className={cn(
								"w-12 h-8",
								errors.page && "focus-visible:ring-red-400"
							)}
							{...register("page")}
							onKeyDown={(k) => {
								if (k.key === "Enter") {
									handleSubmit(handlePageSubmit)();
								}
							}}
						/>
						<p className="text-zinc-700 text-sm space-x-1">
							<span>/</span>
							<span>{numPages ?? "x"}</span>
						</p>
					</div>
					<Button
						aria-label="previous page"
						variant="ghost"
						disabled={currPage <= 1}
						onClick={() => {
							setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
							setValue("page", String(currPage - 1));
						}}
					>
						<ChevronUp className="h-4 w-4" />
					</Button>
				</div>
				<div className="space-x-0 flex justify-between gap-0 sm:space-x-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								aria-label="zoom"
								className="gap-1 sm:gap-1.5 p-1 sm:p-4 text-zinc-600"
							>
								<ZoomIn className="h-4 w-4" />
								{scale * 100}%
								<ChevronDown className="h-3 w-3 opacity-50" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem onSelect={() => setScale(1)}>
								100%
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={() => setScale(1.5)}>
								150%
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={() => setScale(2)}>
								200%
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={() => setScale(2.5)}>
								250%
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<Button
						onClick={() => setRotation((prev) => prev + 90)}
						variant="ghost"
						className="text-zinc-600 p-1 sm:p-4"
					>
						<RotateCw className="h-4 w-4" />
					</Button>

					<PdfFullscreen fileUrl={url} />
				</div>
			</div>
			<div className="flex-1 w-full max-h-screen">
				<SimpleBar autoHide={false} className="max-h-[calc(100vh-11rem)]">
					<div ref={ref}>
						<Document
							loading={
								<div className="flex justify-center">
									<Loader2 className="my-24 h-6 w-6 animate-spin" />
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
								setNumpages(numPages);
							}}
							file={url}
							className="max-h-full"
						>
							{isLoading && renderedScale ? (
								<Page
									width={width ? width : 1}
									pageNumber={currPage}
									scale={scale}
									rotate={rotation}
									key={"@" + renderedScale}
								/>
							) : null}
							<Page
								className={cn(isLoading ? "hidden" : "")}
								width={width ? width : 1}
								pageNumber={currPage}
								scale={scale}
								rotate={rotation}
								key={"@" + scale}
								loading={
									<div className="flex justify-center">
										<Loader2 className="my-24 h-6 w-6 animate-spin" />
									</div>
								}
								onRenderSuccess={() => setRenderedScale(scale)}
							/>
						</Document>
					</div>
				</SimpleBar>
			</div>
		</div>
	);
};

export default PdfRenderer;
