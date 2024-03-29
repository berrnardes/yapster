"use client";

import { trpc } from "@/app/_trpc/client";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const UpgradeButton = () => {
	const { mutate: createStripeSession } = trpc.createStripeSession.useMutation({
		onSuccess: ({ url }) => {
			window.location.href = url ?? "/dashboard/billing";
		},
	});

	return (
		<Button onClick={() => createStripeSession()}>
			Adquirir Agora <ArrowRight className="w-4 h-4 ml-1.5" />
		</Button>
	);
};

export default UpgradeButton;
