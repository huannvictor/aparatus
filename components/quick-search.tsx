import { Eye, Footprints, ScissorsIcon, Sparkles, User } from "lucide-react"
import Link from "next/link"
import { PageSectionScroller } from "./ui/page"

const QuickSearch = () => {
	const searchBadges = [
		{
			icon: <ScissorsIcon />,
			label: "Cabelo",
		},
		{
			icon: <User />,
			label: "Barba",
		},
		{
			icon: <Sparkles />,
			label: "Acabamento",
		},
		{
			icon: <Eye />,
			label: "Sobrancelha",
		},
		{
			icon: <Footprints />,
			label: "Pezinho",
		},
	]
	return (
		<PageSectionScroller>
			{searchBadges.map((badge) => (
				<Link
					href={`/barbershops?search=${badge.label.toLowerCase()}`}
					className="flex shrink-0 snap-center items-center justify-center gap-3 rounded-3xl border-border bg-muted px-4 py-2"
					key={badge.label}
				>
					{badge.icon}
					<span className="font-medium text-card-foreground text-sm">
						{badge.label}
					</span>
				</Link>
			))}
		</PageSectionScroller>
	)
}

export default QuickSearch
