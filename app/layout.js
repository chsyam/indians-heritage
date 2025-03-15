import React from "react";
import "./globals.css";
import { BreadCrumb, Header, Navbar } from "@/components/layout";

export const metadata = {
	title: "Indians Heritage",
	description: "Indians Heritage - Taste the Tradition!",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body suppressHydrationWarning>
				<Header />
				<Navbar />
				<BreadCrumb />
				{children}
			</body>
		</html>
	);
}
