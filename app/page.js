import React from "react";
import FeaturesCarousel from "@/components/home/FeaturesCarousel";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import HowItWorks from "@/components/home/HowItWorks";
import OurBestSellers from "@/components/home/OurBestSellers";

export default function Home() {
	return (
		<div className="h-[2000px]">
			<FeaturesCarousel />
			<CategoryCarousel />
			<OurBestSellers />
			<HowItWorks />
		</div>
	);
}
