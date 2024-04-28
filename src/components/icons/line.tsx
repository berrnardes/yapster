import { LucideProps } from "lucide-react";

const LineIcon = (props: LucideProps) => {
	return (
		<svg
			viewBox="0 0 557 23"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M554 17.0619C527.636 15.7152 443.712 9.71652 395.818 8.98198C347.924 8.24745 306.402 13.634 266.636 12.6547C226.871 11.6753 201.167 1.88148 157.227 3.1057C113.288 4.32993 28.7045 17.1843 3 20"
				stroke="hsl(163, 94%, 24%)"
				strokeWidth={5}
				strokeLinecap="round"
			/>
		</svg>
	);
};

export default LineIcon;
