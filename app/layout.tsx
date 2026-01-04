import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const plusJakartaSans = Plus_Jakarta_Sans({
	variable: "--font-plus-jakarta-sans",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Aparatus",
	description: "Agende nos melhores",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className={`${plusJakartaSans.variable} antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
					{children}
					<Footer />
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	)
}
