"use client"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Image from "next/image"
import { useMemo, useState } from "react"
import type { Barbershop, BarbershopService } from "@/generated/prisma/client"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { Card, CardContent } from "./ui/card"
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet"

interface ServiceItemProps {
	service: BarbershopService
	barbershop: Pick<Barbershop, "name">
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
	const [date, setDate] = useState<Date | undefined>(undefined)
	const [time, setTime] = useState<string | undefined>(undefined)

	const handleDateSelect = (date: Date | undefined) => {
		setDate(date)
		setTime(undefined)
	}

	const handleTimeSelect = (time: string) => {
		setTime(time)
	}

	const timeList = useMemo(() => {
		const startHour = 9
		const endHour = 17
		const interval = 30 // minutes

		const totalSlots = (endHour - startHour) * (60 / interval) + 1

		return Array.from({ length: totalSlots }, (_, i) => {
			const totalMinutes = i * interval
			const hour = startHour + Math.floor(totalMinutes / 60)
			const minutes = totalMinutes % 60
			return `${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
		})
	}, [])

	const priceInReais = (service.priceInCents / 100).toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	})

	return (
		<Sheet>
			<div className="flex w-full items-center gap-3 rounded-2xl border bg-card-background p-3">
				<div className="relative size-27.5 shrink-0">
					<Image
						src={service.imageUrl}
						alt={service.name}
						fill
						className="rounded-[10px] object-cover"
					/>
				</div>
				<div className="flex flex-1 flex-col justify-between">
					<div className="flex h-[67.5px] flex-col gap-1 text-sm leading-[1.4]">
						<p className="font-bold">{service.name}</p>
						<p className="whitespace-pre-wrap text-muted-foreground">
							{service.description}
						</p>
					</div>
					<div className="flex items-center justify-between">
						<p className="font-bold text-sm">{priceInReais}</p>
						<SheetTrigger asChild>
							<Button size="sm" className="rounded-full px-4 py-2 text-sm">
								Reservar
							</Button>
						</SheetTrigger>
					</div>
				</div>
			</div>

			<SheetContent className="overflow-y-auto px-0 py-0">
				<SheetHeader className="px-5 py-6">
					<SheetTitle>Fazer Reserva</SheetTitle>
				</SheetHeader>

				<div className="border-b py-5">
					<Calendar
						mode="single"
						selected={date}
						onSelect={handleDateSelect}
						locale={ptBR}
						disabled={{ before: new Date() }}
						classNames={{
							root: "w-full",
						}}
					/>
				</div>

				{date && (
					<div className="custom-scrollbar flex gap-3 overflow-x-auto border-b px-5 py-6">
						{timeList.map((timeOption) => (
							<Button
								key={timeOption}
								variant={time === timeOption ? "default" : "outline"}
								className="rounded-full"
								onClick={() => handleTimeSelect(timeOption)}
							>
								{timeOption}
							</Button>
						))}
					</div>
				)}

				<div className="p-5">
					{date && time && (
						<Card>
							<CardContent className="flex flex-col gap-3 p-3">
								<div className="flex items-center justify-between">
									<h2 className="font-bold">{service.name}</h2>
									<p className="font-bold text-sm">{priceInReais}</p>
								</div>

								<div className="flex items-center justify-between text-sm">
									<h3 className="text-muted-foreground">Data</h3>
									<p>
										{format(date, "dd 'de' MMMM", {
											locale: ptBR,
										})}
									</p>
								</div>

								<div className="flex items-center justify-between text-sm">
									<h3 className="text-muted-foreground">Horário</h3>
									<p>{time}</p>
								</div>

								<div className="flex items-center justify-between text-sm">
									<h3 className="text-muted-foreground">Barbearia</h3>
									<p>{barbershop.name}</p>
								</div>
							</CardContent>
						</Card>
					)}
				</div>

				<SheetFooter className="px-5">
					<Button disabled={!date || !time} className="w-full">
						Confirmar
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}

export default ServiceItem
