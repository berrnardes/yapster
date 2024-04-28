"use client";

import Footer from "@/components/footer";
import Hero from "./components/hero";
import Instructions from "./components/instructions";
import Resources from "./components/resources";
import Target from "./components/target";

export default function Home() {
	return (
		<>
			<Hero />
			<Resources />
			<Target />
			<Instructions />
			<Footer />
		</>
	);
}
