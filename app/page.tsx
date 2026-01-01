import Image from "next/image"
import BarbershopItem from "@/components/barbershop-item"
import BookingItem from "@/components/booking-item"
import Header from "@/components/header"
import { getBarbershops } from "@/data/barbershops"
import banner from "@/public/banner.png"

export default async function Home() {
	const barbershopsList = await getBarbershops()

	return (
		<div>
			<Header />
			<div className="px-4">
				<Image
					src={banner}
					alt="Agende nos melhores com a Aparatus"
					sizes="100vw"
					className="h-auto w-full"
				/>
			</div>
			<div className="mt-4 space-y-4 px-4">
				<h3 className="font-bold text-xs uppercase" aria-label="Agendamentos">
					Agendamentos
				</h3>
				<BookingItem />
			</div>

			<h3 className="mt-4 pl-4 font-bold text-xs uppercase">Barbearias</h3>
			<div className="custom-scrollbar mt-4 flex snap-x gap-4 overflow-x-auto px-4">
				{barbershopsList.map((barbershop) => (
					<BarbershopItem key={barbershop.id} barbershop={barbershop} />
				))}
			</div>
		</div>
	)
}
