"use client"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { useAction } from "next-safe-action/hooks"
import { useMemo, useState } from "react"
import { toast } from "sonner"
import { createBooking } from "@/actions/create-booking"
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
	const [sheetIsOpen, setSheetIsOpen] = useState(false)
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
	const [selectedTime, setSelectedTime] = useState<string | undefined>(
		undefined,
	)
	const { executeAsync: executeCreateBooking, isPending: isCreatingBooking } =
		useAction(createBooking)

	const handleDateSelect = (date: Date | undefined) => {
		setSelectedDate(date)
		setSelectedTime(undefined)
	}

	const handleTimeSelect = (time: string) => {
		setSelectedTime(time)
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

	const handleConfirmedBooking = async () => {
		if (!selectedDate || !selectedTime) {
			return []
		}
		const [hour, minute] = selectedTime.split(":")
		const date = new Date(selectedDate)
		date.setHours(Number(hour), Number(minute))
		const result = await executeCreateBooking({
			date,
			serviceId: service.id,
		})
		if (result.validationErrors) {
			return toast.error(result.validationErrors._errors?.[0])
		}
		if (result.serverError) {
			return toast.error("Erro ao criar agendamento. Tente novamente.")
		}

		toast.success("agendamento criado com sucesso!")
		setSheetIsOpen(false)
		setSelectedDate(undefined)
		setSelectedTime(undefined)
	}

	return (
		<Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
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

			<SheetContent className="custom-scrollbar overflow-y-auto px-0 py-0">
				<SheetHeader className="px-5 py-6">
					<SheetTitle>Fazer Reserva</SheetTitle>
				</SheetHeader>

				<div className="border-b py-5">
					<Calendar
						mode="single"
						selected={selectedDate}
						onSelect={handleDateSelect}
						locale={ptBR}
						disabled={{ before: new Date() }}
						classNames={{
							root: "w-full",
						}}
					/>
				</div>

				{selectedDate && (
					<div className="custom-scrollbar flex gap-3 overflow-x-auto border-b px-5 py-6">
						{timeList.map((timeOption) => (
							<Button
								key={timeOption}
								variant={selectedTime === timeOption ? "default" : "outline"}
								className="rounded-full"
								onClick={() => handleTimeSelect(timeOption)}
							>
								{timeOption}
							</Button>
						))}
					</div>
				)}

				<div className="p-5">
					{selectedDate && selectedTime && (
						<Card>
							<CardContent className="flex flex-col gap-3 p-3">
								<div className="flex items-center justify-between">
									<h2 className="font-bold">{service.name}</h2>
									<p className="font-bold text-sm">{priceInReais}</p>
								</div>

								<div className="flex items-center justify-between text-sm">
									<h3 className="text-muted-foreground">Data</h3>
									<p>
										{format(selectedDate, "dd 'de' MMMM", {
											locale: ptBR,
										})}
									</p>
								</div>

								<div className="flex items-center justify-between text-sm">
									<h3 className="text-muted-foreground">Horário</h3>
									<p>{selectedTime}</p>
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
					<Button
						disabled={!selectedDate || !selectedTime || isCreatingBooking}
						className="w-full"
						onClick={handleConfirmedBooking}
					>
						{isCreatingBooking ? (
							<Loader2 className="size-4 animate-spin" />
						) : (
							"Confirmar"
						)}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}

export default ServiceItem
