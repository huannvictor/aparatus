"use client"

import { toast } from "sonner"
import { Button } from "./ui/button"

interface CopyPhoneButtonProps {
	phone: string
}

const CopyPhoneButton = ({ phone }: CopyPhoneButtonProps) => {
	const handleCopy = async (): Promise<void> => {
		try {
			await navigator.clipboard.writeText(phone)
			toast.success("Telefone copiado!", {
				description: phone,
			})
		} catch (error) {
			console.error("Erro ao copiar telefone:", error)
			toast.error("Erro ao copiar telefone")
		}
	}

	return (
		<Button
			variant="outline"
			size="sm"
			onClick={handleCopy}
			className="rounded-full px-4 py-2 text-sm"
		>
			Copiar
		</Button>
	)
}

export default CopyPhoneButton
