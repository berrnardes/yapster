import { UserButton } from "@clerk/nextjs";

const Dashboard = () => {
	return (
		<div>
			Dashboard
			<UserButton afterSignOutUrl="/" />
		</div>
	);
};

export default Dashboard;
