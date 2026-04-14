import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/providers";

const cormorant = Cormorant_Garamond({
	variable: "--font-cormorant",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	style: ["normal", "italic"],
	display: "swap",
});

const jost = Jost({
	variable: "--font-jost",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Pastors' Summit 2026 | Cebu Pastoral & Ministerial Association",
	description:
		"Join us for Pastors' Summit 2026 — a gathering of pastors and ministry leaders under the Cebu Pastoral and Ministerial Association. April 17, 2026 at Nissi Academy International, Lapu-Lapu City, Cebu.",
	openGraph: {
		title: "Pastors' Summit 2026",
		description: "A gathering of church leaders. April 17, 2026 · Lapu-Lapu City, Cebu",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={`${cormorant.variable} ${jost.variable}`}>
			<body className='min-h-screen antialiased'>
				<Providers>
					<Toaster richColors />

					{children}
				</Providers>
			</body>
		</html>
	);
}
