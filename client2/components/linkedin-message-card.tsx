"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface LinkedInMessageCardProps {
  slide: {
    colorCategory: string
    messageCategory: string
    titleCategory: string
    linkedinSimulationMessage: {
      receiverName: string
      receiverProfilePicture: string
      receiverHeadline: string
      senderName: string
      senderProfilePicture: string
      senderHeadline: string
      message: string
    }
  }
  isFocused: boolean
  position: "prev" | "active" | "next" | "hidden"
}

export function LinkedInMessageCard({ slide, isFocused, position }: LinkedInMessageCardProps) {
  const { colorCategory, messageCategory, titleCategory, linkedinSimulationMessage } = slide

  // Determinar el color de fondo según la posición
  const getBackgroundColor = () => {
    if (position === "active") {
      return "#086bc9" // Color de LinkedIn primario para el slide activo
    } else if (position === "prev") {
      return "#064e94" // Azul oscuro para el slide anterior
    } else if (position === "next") {
      return "#0a85f3" // Azul claro para el slide siguiente
    } else {
      return "#333333" // Color para slides ocultos
    }
  }

  return (
    <Card
      className="h-full w-full overflow-hidden shadow-xl"
      style={{
        backgroundColor: getBackgroundColor(),
      }}
    >
      <CardContent className="p-6">
        <div className="mb-4">
          <span
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-black/20"
            style={{ color: colorCategory }}
          >
            {messageCategory}
          </span>
          <h3 className="mt-2 text-xl font-bold text-white">{titleCategory}</h3>
        </div>

        {/* LinkedIn Message Simulation */}
        <Card className="bg-white shadow-lg overflow-hidden">
          <CardContent className="p-4">
            {/* Receiver Info */}
            <div className="flex items-center mb-4">
              <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                <Image
                  src={linkedinSimulationMessage.receiverProfilePicture || "/placeholder.svg"}
                  alt={linkedinSimulationMessage.receiverName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{linkedinSimulationMessage.receiverName}</h4>
                <p className="text-xs text-gray-600 line-clamp-1">{linkedinSimulationMessage.receiverHeadline}</p>
              </div>
            </div>

            {/* Message Content */}
            <div className="bg-blue-50 rounded-lg p-3 mb-3">
              <p className="text-sm text-gray-800">{linkedinSimulationMessage.message}</p>
            </div>

            {/* Sender Info */}
            <div className="flex items-center">
              <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                <Image
                  src={linkedinSimulationMessage.senderProfilePicture || "/placeholder.svg"}
                  alt={linkedinSimulationMessage.senderName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">{linkedinSimulationMessage.senderName}</h4>
                <p className="text-xs text-gray-600 line-clamp-1">{linkedinSimulationMessage.senderHeadline}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
