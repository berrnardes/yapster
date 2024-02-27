import Image from "next/image";
import Link from "next/link";
import MaxWidthWrapper from "./max-width-wrapper";

const Navigation = () => {
	return (
		<div className="min-h-14 sticky inset-x-2 w-full bg-white/75 border-zinc-200 backdrop-blur-lg transition-all border-b top-0 z-30">
			<MaxWidthWrapper>
				<div className="flex min-h-14 justify-between items-center border-b border-zinc-200">
					<h1 className="text-xl font-semibold text-zinc-700">
						<Link href="/">
							<Image
								src="/yapster-logo.svg"
								alt="Yapster"
								width={130}
								height={15}
							/>
						</Link>
					</h1>
					{/* TODO MOBILE NAV */}

					{/* CLERK IMPLEMENTATION */}
					<div></div>
				</div>
			</MaxWidthWrapper>
		</div>
	);
};

export default Navigation;
