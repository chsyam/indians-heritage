import React from "react";
import "./globals.css";
import { BreadCrumb, CopyRight, Footer, Header, Navbar } from "@/components/layout";

export const metadata = {
	title: "Indians Heritage",
	description: "Indians Heritage - Taste the Tradition!",
	icons: {
		icon: [
			{ url: '/images/logo.svg', sizes: 'any', type: 'image/svg+xml' },
		]
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body suppressHydrationWarning>
				<Header />
				<Navbar />
				<BreadCrumb />
				{children}
				<Footer />
				<CopyRight />
			</body>
		</html>
	);
}
