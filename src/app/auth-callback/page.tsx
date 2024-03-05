"use client";

import { Loader2 } from "lucide-react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";

const Page = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const origin = searchParams.get("origin");

	const { isSuccess, isError } = trpc.authCallback.useQuery(undefined, {
		retry: true,
		retryDelay: 500,
	});

	if (isSuccess) redirect(origin ? `/${origin}` : "/dashboard");
	if (isError) redirect("/sign-in");

	return (
		<div className="w-full mt-24 flex justify-center">
			<div className="flex flex-col items-center gap-2">
				<Loader2 className="w-8 h-8 animate-spin text-zinc-800" />
				<h3 className="font-semibold text-3xl">Setting up your account</h3>
				<p>You will be redirected automatically 😄</p>
			</div>
		</div>
	);
};

export default Page;
