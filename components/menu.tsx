"use client"

import {
	CalendarIcon,
	HomeIcon,
	LogInIcon,
	LogOutIcon,
	MenuIcon,
	UserIcon,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import Divider from "./divider"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet"

const categories = [
	"Cabelo",
	"Barba",
	"Acabamento",
	"Sobrancelha",
	"Massagem",
	"Hidratação",
]

const Menu = () => {
	const { data: session } = authClient.useSession()

	const handleLogin = async () => {
		const { error } = await authClient.signIn.social({
			provider: "google",
		})

		if (error) {
			toast.error(error.message)
			return
		}
	}

	const handleLogout = async () => {
		const { error } = await authClient.signOut()

		if (error) {
			toast.error(error.message)
			return
		}
	}

	const isLoggedIn = !!session?.user

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon">
					<MenuIcon />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="p-0">
				<SheetHeader className="border-border border-b border-solid px-5 py-6 text-left">
					<SheetTitle>Menu</SheetTitle>
				</SheetHeader>

				<div className="flex flex-col gap-6 py-6">
					<div className="flex items-center justify-between px-5">
						{isLoggedIn ? (
							<div className="flex items-center gap-3">
								<Avatar>
									<AvatarImage src={session.user.image?.toString() ?? ""} />
									<AvatarFallback>
										{session.user.name.charAt(0).toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div>
									<h2 className="font-bold">{session.user.name}</h2>
									<p className="text-muted-foreground text-sm">
										{session.user.email}
									</p>
								</div>
							</div>
						) : (
							<div className="flex flex-col gap-3">
								<div className="flex items-center gap-2">
									<UserIcon className="size-8" />
									<p className="font-bold">Olá, faça seu login!</p>
								</div>
								<Button
									className="w-full justify-start gap-2"
									variant="secondary"
									onClick={handleLogin}
								>
									<LogInIcon className="size-4" />
									Fazer Login
								</Button>
							</div>
						)}
					</div>

					<Divider />

					<div className="flex flex-col gap-3 p-3">
						<Button
							asChild
							variant="ghost"
							className="w-full justify-start gap-2 font-bold text-sm"
						>
							<Link href="/">
								<HomeIcon size={16} />
								Início
							</Link>
						</Button>

						{isLoggedIn && (
							<Button
								asChild
								variant="ghost"
								className="w-full justify-start gap-2 font-bold text-sm"
							>
								<Link href="/bookings">
									<CalendarIcon size={16} />
									Agendamentos
								</Link>
							</Button>
						)}
					</div>

					<Divider />

					<div className="flex flex-col gap-3 p-3">
						{categories.map((category, index) => (
							<Button
								key={`category-${index.toString()}`}
								asChild
								variant="ghost"
								className="w-full justify-start rounded-full font-normal"
							>
								<Link href={`/barbershops?search=${category.toLowerCase()}`}>
									{category}
								</Link>
							</Button>
						))}
					</div>
				</div>

				<Divider />

				{isLoggedIn && (
					<SheetFooter className="p-5">
						<Button
							variant="ghost"
							className="w-full justify-start gap-3 text-muted-foreground text-sm"
							onClick={handleLogout}
						>
							<LogOutIcon className="size-5" />
							Sair da conta
						</Button>
					</SheetFooter>
				)}
			</SheetContent>
		</Sheet>
	)
}

export default Menu
