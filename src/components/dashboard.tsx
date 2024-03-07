import MaxWidthWrapper from "./max-width-wrapper";
import UploadButton from "./upload/upload-button";

const Dashboard = () => {
	return (
		<MaxWidthWrapper className="md:pt-10 pt-5">
			<div className="flex flex-col gap-4 border-b border-zinc-200 pb-5 sm:flex-row sm:items-center sm:gap-0 items-start justify-between">
				<h1 className="text-4xl sm:text-5xl font-bold mb-3 text-zinc-700">
					My Files
				</h1>
				<UploadButton />
			</div>
		</MaxWidthWrapper>
	);
};

export default Dashboard;
