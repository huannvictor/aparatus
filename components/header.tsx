"use client"

import { MenuIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import Menu from "./menu"
import { Button } from "./ui/button"

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false)

	return (
		<>
			<header className="flex items-center justify-between bg-background px-5 py-6">
				<Image src="/logo.svg" alt="Logo Aparatus" width={91} height={24} />
				<Button
					variant="outline"
					size="icon"
					onClick={() => setMenuOpen(true)}
				>
					<MenuIcon />
				</Button>
			</header>
			<Menu open={menuOpen} onOpenChange={setMenuOpen} isLoggedIn={true} />
		</>
	)
}

export default Header
