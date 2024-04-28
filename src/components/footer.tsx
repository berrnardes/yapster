import Image from "next/image";
import Link from "next/link";

const Footer = () => {
	return (
		<div className="min-h-7 mt-3 border-t border-zinc-200 bg-white flex items-center justify-center w-full">
			<div className="py-20 flex flex-col items-center justify-center gap-2">
				<Link href="/">
					<Image
						priority={true}
						className="w-40 h-10"
						src="/yapster-logo.svg"
						alt="Yapster"
						width={150}
						height={17}
					/>
				</Link>
				<p className="text-center text-md">All Rights Reserved &#169; 2024</p>
			</div>
		</div>
	);
};

export default Footer;
