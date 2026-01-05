"use client"

import {
	CalendarDays,
	Home,
	LogIn,
	LogOut,
	UserIcon,
} from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "./ui/sheet"

interface MenuProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	isLoggedIn?: boolean
}

const categories = [
	"Cabelo",
	"Barba",
	"Acabamento",
	"Sobrancelha",
	"Massagem",
	"Hidratação",
]

const Menu = ({ open, onOpenChange, isLoggedIn = false }: MenuProps) => {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent side="right" className="p-0">
				<div className="flex h-full flex-col py-5">
					<SheetHeader className="px-5 text-left">
						<SheetTitle>Menu</SheetTitle>
					</SheetHeader>

					<div className="mt-6 flex flex-col gap-6">
						<div className="border-t border-border" />

						{isLoggedIn ? (
							<div className="flex items-center gap-3 px-5">
								<Avatar className="size-12">
									<AvatarImage
										src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop"
										alt="Pedro Lucas"
									/>
									<AvatarFallback>PL</AvatarFallback>
								</Avatar>
								<div className="flex flex-col">
									<p className="font-semibold">Pedro Lucas</p>
									<p className="text-sm text-muted-foreground">
										pedrolucas@gmail.com
									</p>
								</div>
							</div>
						) : (
							<div className="flex flex-col gap-3 px-5">
								<div className="flex items-center gap-2">
									<UserIcon className="size-8" />
									<p className="font-bold">Olá, faça seu login!</p>
								</div>
								<Button
									className="w-full justify-start gap-2"
									variant="secondary"
								>
									<LogIn className="size-4" />
									Fazer Login
								</Button>
							</div>
						)}

						<div className="border-t border-border" />

						<div className="flex flex-col gap-2 px-5">
							<Button
								asChild
								variant="ghost"
								className="justify-start gap-3 rounded-full text-base font-bold"
								onClick={() => onOpenChange(false)}
							>
								<Link href="/">
									<Home className="size-5" />
									Início
								</Link>
							</Button>
							{isLoggedIn && (
								<Button
									asChild
									variant="ghost"
									className="justify-start gap-3 rounded-full text-base font-bold"
									onClick={() => onOpenChange(false)}
								>
									<Link href="/bookings">
										<CalendarDays className="size-5" />
										Agendamentos
									</Link>
								</Button>
							)}
						</div>

						<div className="border-t border-border" />

						<div className="flex flex-col gap-2 px-5">
							{categories.map((category) => (
								<Button
									key={category}
									asChild
									variant="ghost"
									className="justify-start rounded-full text-base font-normal text-muted-foreground"
									onClick={() => onOpenChange(false)}
								>
									<Link href={`/barbershops?search=${category.toLowerCase()}`}>
										{category}
									</Link>
								</Button>
							))}
						</div>

						<div className="border-t border-border" />

						{isLoggedIn && (
							<div className="px-5">
								<Button
									variant="ghost"
									className="w-full justify-start gap-3 rounded-full text-base font-bold"
								>
									<LogOut className="size-5" />
									Sair da conta
								</Button>
							</div>
						)}
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}

export default Menu
