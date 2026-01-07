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
import Divider from "./divider"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"

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
	"Hidratação"
]

const Menu = ({ open, onOpenChange, isLoggedIn = false }: MenuProps) => {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetTrigger asChild>
				<Button variant='outline' size='icon'>
					<MenuIcon />
				</Button>	
			</SheetTrigger>
			<SheetContent side='left' className="p-0">
				<SheetHeader className="border-border border-b border-solid px-5 py-6 text-left">
					<SheetTitle>Menu</SheetTitle>
				</SheetHeader>

				<div className="flex flex-col gap-6 py-6">
					<div className="flex items-center justify-between px-5">
						{isLoggedIn ? (
							<div className="flex items-center gap-3">
								<Avatar>
									<AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop" />
									<AvatarFallback>
										{"UN".toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div>
									<h2 className="font-bold">Pedro Lucas</h2>
									<p className="text-muted-foreground text-sm">
										pedrolucas@gmail.com
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
								onClick={() => onOpenChange(false)}
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
