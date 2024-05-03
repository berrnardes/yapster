"use client";

import { trpc } from "@/app/_trpc/client";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

interface BillingFormProps {
	getUserSubscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}

const BillingForm = ({ getUserSubscriptionPlan }: BillingFormProps) => {
	const { toast } = useToast();

	const { mutate: createStripeSession, isPending } =
		trpc.createStripeSession.useMutation({
			onSuccess: ({ url }) => {
				if (url) window.location.href = url;
				if (!url)
					toast({
						title: "Parece que tivemos um problema ....",
						description: "Por favor tente de novo",
						variant: "destructive",
					});
			},
		});

	return (
		<MaxWidthWrapper className="max-w-5xl">
			<form
				className="mt-12"
				onSubmit={(e) => {
					e.preventDefault();
					createStripeSession();
				}}
			>
				<Card>
					<CardHeader>
						<CardTitle>Plano de Inscrição</CardTitle>
						<CardDescription>
							Seu plano atual é <strong>{getUserSubscriptionPlan.name}</strong>
						</CardDescription>
					</CardHeader>
					<CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0 ">
						<Button type="submit">
							{isPending ? (
								<Loader2 className="mr-4 w-5 h-5 animate-spin" />
							) : null}
							{getUserSubscriptionPlan.isSubscribed
								? "Gerenciar Inscrição"
								: "Atualizar plano"}
						</Button>
						{getUserSubscriptionPlan.isSubscribed ? (
							<p className="rounded-full text-xs sm:text-sm font-medium">
								{getUserSubscriptionPlan.isCanceled
									? "Seu plano será cancelado em: "
									: "Seu plano se renova em: "}
								{format(
									getUserSubscriptionPlan.stripeCurrentPeriodEnd!,
									"dd/mm/yy"
								)}
							</p>
						) : null}
					</CardFooter>
				</Card>
			</form>
		</MaxWidthWrapper>
	);
};

export default BillingForm;
