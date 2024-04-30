import { LucideProps } from "lucide-react";

const Gertrude = (props: LucideProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="80"
			height="80"
			fill="none"
			viewBox="0 0 36 36"
			{...props}
		>
			<mask
				id=":r1c:"
				width="36"
				height="36"
				x="0"
				y="0"
				maskUnits="userSpaceOnUse"
			>
				<rect width="36" height="36" fill="#FFF" rx="72"></rect>
			</mask>
			<g mask="url(#:r1c:)">
				<path fill="#ff7d10" d="M0 0H36V36H0z"></path>
				<rect
					width="36"
					height="36"
					fill="#0a0310"
					rx="6"
					transform="rotate(155 20.61 18.054) scale(1.2)"
				></rect>
				<g transform="rotate(-5 -26.308 -18.356)">
					<path
						stroke="#FFF"
						strokeLinecap="round"
						d="M15 21c2 1 4 1 6 0"
					></path>
					<rect width="1.5" height="2" x="14" y="14" fill="#FFF" rx="1"></rect>
					<rect width="1.5" height="2" x="20" y="14" fill="#FFF" rx="1"></rect>
				</g>
			</g>
		</svg>
	);
};

export default Gertrude;
