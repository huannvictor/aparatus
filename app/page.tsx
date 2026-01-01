import Image from "next/image"
import BarbershopItem from "@/components/barbershop-item"
import BookingItem from "@/components/booking-item"
import Header from "@/components/header"
import {
	PageContainer,
	PageSectionContent,
	PageSectionScroller,
	PageSectionTitle,
} from "@/components/ui/page"
import { getBarbershops, getPopularBarbershops } from "@/data/barbershops"
import banner from "@/public/banner.png"

export default async function Home() {
	const barbershopsList = await getBarbershops()
	const popularBarbershopsList = await getPopularBarbershops()

	return (
		<div>
			<Header />
			<PageContainer>
				<Image
					src={banner}
					alt="Agende nos melhores com a Aparatus"
					sizes="100vw"
					className="h-auto w-full"
				/>

				<PageSectionContent>
					<PageSectionTitle>Agendamentos</PageSectionTitle>
					<BookingItem />
				</PageSectionContent>

				<PageSectionContent>
					<PageSectionTitle>Barbearias</PageSectionTitle>
					<PageSectionScroller>
						{barbershopsList.map((barbershop) => (
							<BarbershopItem key={barbershop.id} barbershop={barbershop} />
						))}
					</PageSectionScroller>
				</PageSectionContent>

				<PageSectionContent>
					<PageSectionTitle>Barbearias Populares</PageSectionTitle>
					<PageSectionScroller>
						{popularBarbershopsList.map((barbershop) => (
							<BarbershopItem key={barbershop.id} barbershop={barbershop} />
						))}
					</PageSectionScroller>
				</PageSectionContent>
			</PageContainer>
		</div>
	)
}
