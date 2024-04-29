import { LucideProps } from "lucide-react";

const BoringAvatar = {
	mary_baker: (props: LucideProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="80"
			height="80"
			fill="none"
			viewBox="0 0 80 80"
			{...props}
		>
			<mask
				id=":r6c:"
				width="80"
				height="80"
				x="0"
				y="0"
				maskUnits="userSpaceOnUse"
			>
				<rect width="80" height="80" fill="#FFF" rx="160"></rect>
			</mask>
			<g mask="url(#:r6c:)">
				<path fill="#4d433d" d="M0 0H80V80H0z"></path>
				<path
					fill="#525c5a"
					d="M10 30H90V110H10z"
					transform="rotate(-40 25.01 46.99)"
				></path>
				<circle
					cx="40"
					cy="40"
					r="16"
					fill="#56877d"
					transform="translate(-3 -3)"
				></circle>
				<path
					stroke="#8ccc81"
					strokeWidth="2"
					d="M0 40L80 40"
					transform="rotate(-80 40 40)"
				></path>
			</g>
		</svg>
	),
};

export default BoringAvatar;
