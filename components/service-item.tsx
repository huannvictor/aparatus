import Image from "next/image"
import type { BarbershopService } from "@/generated/prisma/client"
import { Button } from "./ui/button"

interface ServiceItemProps {
	service: BarbershopService
}

const ServiceItem = ({ service }: ServiceItemProps) => {
	const priceInReais = (service.priceInCents / 100).toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	})

	return (
		<div className="flex w-full items-center gap-3 rounded-2xl border bg-card-background p-3">
			<div className="relative size-[110px] shrink-0">
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
					<Button size="sm" className="rounded-full px-4 py-2 text-sm">
						Reservar
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ServiceItem
