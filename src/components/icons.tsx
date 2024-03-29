import { LucideProps, User } from "lucide-react";

export const Icons = {
	user: User,
	logo: (props: LucideProps) => (
		<svg
			viewBox="0 0 36 36"
			fill="none"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			width="80"
			height="80"
		>
			<mask
				id=":r2h:"
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="36"
				height="36"
			>
				<rect width="36" height="36" fill="#FFFFFF" rx="72"></rect>
			</mask>
			<g mask="url(#:r2h:)">
				<rect width="36" height="36" fill="#464646"></rect>
				<rect
					x="0"
					y="0"
					width="36"
					height="36"
					transform="translate(4 4) rotate(230 18 18) scale(1.2)"
					fill="#464646"
					rx="6"
				></rect>
				<g transform="translate(6 -2) rotate(0 18 18)">
					<path
						d="M15 21c2 1 4 1 6 0"
						stroke="#FFFFFF"
						fill="none"
						stroke-linecap="round"
					></path>
					<rect
						x="14"
						y="14"
						width="1.5"
						height="2"
						rx="1"
						stroke="none"
						fill="#FFFFFF"
					></rect>
					<rect
						x="20"
						y="14"
						width="1.5"
						height="2"
						rx="1"
						stroke="none"
						fill="#FFFFFF"
					></rect>
				</g>
			</g>
		</svg>
	),
	boringavatar: (props: LucideProps) => (
		<svg
			viewBox="0 0 80 80"
			fill="none"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			width="80"
			height="80"
		>
			<mask
				id=":rja:"
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="80"
				height="80"
			>
				<rect width="80" height="80" fill="#FFFFFF"></rect>
			</mask>
			<g mask="url(#:rja:)">
				<rect width="80" height="80" fill="#f23460"></rect>
				<rect
					x="10"
					y="30"
					width="80"
					height="80"
					fill="#321d2e"
					transform="translate(14 -14) rotate(36 40 40)"
				></rect>
				<circle
					cx="40"
					cy="40"
					fill="#cdeccc"
					r="16"
					transform="translate(3 3)"
				></circle>
				<line
					x1="0"
					y1="40"
					x2="80"
					y2="40"
					stroke-width="2"
					stroke="#edd269"
					transform="translate(12 12) rotate(72 40 40)"
				></line>
			</g>
		</svg>
	),
};
