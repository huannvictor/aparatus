import Image from "next/image"
import type { Barbershop } from "@/generated/prisma/client"

interface BarbershopItemProps {
	barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
	return (
		<div className="relative min-h-50 min-w-72.5 rounded-xl">
			<div className="absolute top-0 left-0 z-10 h-full w-full rounded-lg bg-linear-to-t from-black to-transparent" />
			<Image
				src={barbershop.imageUrl}
				alt={`Imagem da barbearia ${barbershop.name}`}
				fill
				className="snap-center rounded-xl object-cover"
			/>
			<div className="absolute right-0 bottom-0 left-0 z-20 p-4">
				<h3 className="font-bold text-background text-lg">{barbershop.name}</h3>
				<p className="text-background text-xs">{barbershop.address}</p>
			</div>
		</div>
	)
}

export default BarbershopItem
