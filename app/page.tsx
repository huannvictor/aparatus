import Image from "next/image"
import BookingItem from "@/components/booking-item"
import Header from "@/components/header"
import banner from "@/public/banner.png"

export default function Home() {
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
		</div>
	)
}
