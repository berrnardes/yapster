import Image from "next/image";

const Footer = () => {
	return (
		<div className="min-h-7 mt-3 border-t border-zinc-200 bg-white flex items-center justify-center w-full">
			<div className="py-9 flex flex-col items-center justify-center gap-2">
				<Image src="yapster-logo.svg" alt="Logo" width={150} height={17} />
				<p className="text-center text-md">All Rights Reserved &#169; 2024</p>
			</div>
		</div>
	);
};

export default Footer;
