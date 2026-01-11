import { Smartphone } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"
import BackButton from "@/components/back-button"
import CopyPhoneButton from "@/components/copy-phone-button"
import Divider from "@/components/divider"
import ServiceItem from "@/components/service-item"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
	PageContainer,
	PageSectionContent,
	PageSectionTitle,
} from "@/components/ui/page"
import { getBarbershopById } from "@/data/barbershops"

interface BarbershopPageProps {
	params: Promise<{ id: string }>
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
	const { id } = await params
	const barbershop = await getBarbershopById(id)

	if (!barbershop) {
		notFound()
	}

	return (
		<div>
			<div className="relative h-74.25 w-full">
				<Image
					src={barbershop.imageUrl}
					alt={barbershop.name}
					fill
					className="object-cover"
					sizes="100vw"
				/>
				<BackButton />
			</div>

			<div className="relative -mt-6 rounded-t-3xl bg-background">
				<PageContainer>
					<PageSectionContent>
						<div className="flex items-center gap-1.5">
							<Avatar className="size-7.5 shrink-0">
								<AvatarImage src={barbershop.imageUrl} alt={barbershop.name} />
							</Avatar>
							<h1 className="font-bold text-xl">{barbershop.name}</h1>
						</div>
						<div className="mt-1">
							<p className="text-muted-foreground text-sm leading-[1.4]">
								{barbershop.address}
							</p>
						</div>
					</PageSectionContent>
				</PageContainer>

				<Divider />

				<PageContainer>
					<PageSectionContent>
						<PageSectionTitle>Sobre Nós</PageSectionTitle>
						<p className="whitespace-pre-wrap text-sm leading-[1.4]">
							{barbershop.description}
						</p>
					</PageSectionContent>
				</PageContainer>

				<Divider />

				<PageContainer>
					<PageSectionContent>
						<PageSectionTitle>Serviços</PageSectionTitle>
						<div className="space-y-3">
							{barbershop.barbershopServices.map((service) => (
								<ServiceItem
									key={service.id}
									service={service}
									barbershop={barbershop}
								/>
							))}
						</div>
					</PageSectionContent>
				</PageContainer>

				<Divider />

				<PageContainer>
					<PageSectionContent>
						<PageSectionTitle>Contato</PageSectionTitle>
						<div className="space-y-3">
							{barbershop.phones.map((phone, index) => (
								<div
									key={`${phone}-${index.toString()}`}
									className="flex items-center justify-between"
								>
									<div className="flex items-center gap-2.5">
										<Smartphone className="size-6 shrink-0" />
										<p className="text-sm leading-[1.4]">{phone}</p>
									</div>
									<CopyPhoneButton phone={phone} />
								</div>
							))}
						</div>
					</PageSectionContent>
				</PageContainer>
			</div>
		</div>
	)
}

export default BarbershopPage
