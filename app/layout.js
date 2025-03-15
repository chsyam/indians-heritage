import React from "react";
import "./globals.css";

export const metadata = {
	title: "Indians Heritage",
	description: "Indians Heritage - Taste the Tradition!",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body suppressHydrationWarning>
				{children}
			</body>
		</html>
	);
}
