import BillingForm from "@/components/billing-form";
import { getUserSubscriptionPlan } from "@/lib/stripe";

const BillingPage = async () => {
	const subscriptionPlan = await getUserSubscriptionPlan();

	return <BillingForm getUserSubscriptionPlan={subscriptionPlan} />;
};

export default BillingPage;
