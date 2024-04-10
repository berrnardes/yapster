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
	line: (props: LucideProps) => (
		<svg
			className="w-60 sm:w-96 lg:w-[450px]"
			viewBox="0 0 557 23"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M554 17.0619C527.636 15.7152 443.712 9.71652 395.818 8.98198C347.924 8.24745 306.402 13.634 266.636 12.6547C226.871 11.6753 201.167 1.88148 157.227 3.1057C113.288 4.32993 28.7045 17.1843 3 20"
				stroke="#047857"
				stroke-width="5"
				stroke-linecap="round"
			/>
		</svg>
	),
	shape: (props: LucideProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			version="1.1"
			viewBox="0 0 600 600"
			opacity="1"
			{...props}
		>
			<path
				d="M531.9679273992796 300.0575343464328C493.52650589049057 263.7081640257948 324.0704359442015 199.37760779207085 282.4909376531859 205.91526139721407C240.91143936217026 212.4529150023573 289.42085657815335 301.6265498493625 282.4909376531859 339.2834559772922C275.5610187282184 376.9403621052219 202.47000259459213 417.7353602741672 240.9114241033812 431.8566981647922C279.35284561217026 445.9780360554172 464.63004948993716 445.97801062410207 513.1394667059203 424.0114833210422C561.6488839219033 402.0449560179823 570.4093489080686 336.4069046670708 531.9679273992796 300.0575343464328C493.52650589049057 263.7081640257948 324.0704359442015 199.37760779207085 282.4909376531859 205.91526139721407 "
				fill="hsl(160, 84%, 39%)"
				transform="matrix(1.000000000000001,-0.5183471240341333,0.17632698070846414,0.9086014166601464,-146.79957801643627,211.2523971340931)"
				stroke-width="4"
				stroke="hsl(164, 86%, 16%)"
				fill-opacity="1"
				strokeOpacity="0.05"
			></path>
			<defs></defs>
			<path
				d="M408.27011561044765 151.7801988038163C369.8286941016586 115.43082848317829 200.37262415536952 51.10027224945432 158.7931258643539 57.63792585459754C117.21362757333827 64.17557945974076 165.72304478932136 153.34921430674598 158.7931258643539 191.00612043467567C151.86320693938643 228.66302656260535 78.77219080576015 269.45802473155067 117.21361231454921 283.57936262217567C155.65503382333827 297.70070051280067 340.9322377011052 297.70067508148554 389.4416549170883 275.73414777842567C437.9510721330713 253.7676204753658 446.7115371192367 188.1295691244543 408.27011561044765 151.7801988038163C369.8286941016586 115.43082848317829 200.37262415536952 51.10027224945432 158.7931258643539 57.63792585459754 "
				fill-opacity="1"
				fill="none"
				opacity="1"
				strokeOpacity="0.58"
				stroke-width="4"
				stroke="hsl(224, 76%, 48%)"
				transform="matrix(1.000000000000001,-0.5183471240341333,0.17632698070846414,0.9086014166601468,18.514554673993416,306.59727628448354)"
			></path>
		</svg>
	),
};
