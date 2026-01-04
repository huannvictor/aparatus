"use client"

import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

const BackButton = () => {
	const router = useRouter()

	return (
		<Button
			variant="outline"
			onClick={() => router.back()}
			className="absolute top-4 left-4 z-10 size-10 rounded-full bg-background p-0"
		>
			<ChevronLeft className="size-5" />
		</Button>
	)
}

export default BackButton
