import Image from "next/image"
import Menu from "./menu"

const Header = () => {
	return (
		<header className="flex items-center justify-between bg-background px-5 py-6">
			<Image src="/logo.svg" alt="Logo Aparatus" width={91} height={24} />
			<Menu />
		</header>
	)
}

export default Header
