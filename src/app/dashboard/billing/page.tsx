import { getUserSubscriptionPlan } from "@/lib/stripe";
import BillingForm from "../components/billing-form";

const BillingPage = async () => {
	const subscriptionPlan = await getUserSubscriptionPlan();

	return <BillingForm getUserSubscriptionPlan={subscriptionPlan} />;
};

export default BillingPage;
