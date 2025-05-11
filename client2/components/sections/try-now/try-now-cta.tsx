"use client"

/**
 * Try now CTA component
 * Displays the call-to-action card for the try now section
 */
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Linkedin } from "lucide-react"
import { buttonStyles } from "@/utils/styles"

interface TryNowCTAProps {
  availableGenerations: number
  onStartClick: () => void
}

export function TryNowCTA({ availableGenerations, onStartClick }: TryNowCTAProps) {
  return (
    <Card className="bg-gradient-to-b from-zinc-800/80 to-zinc-900/80 border-0 relative backdrop-blur-sm hover:from-zinc-800 hover:to-zinc-900 transition-colors overflow-hidden">
      <div className="absolute inset-0.5 rounded-lg bg-gradient-to-br from-linkedin to-linkedin-light opacity-20"></div>
      <div className="absolute inset-0 rounded-[7px] border border-linkedin/50"></div>
      <CardContent className="p-8 relative">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="rounded-full bg-linkedin/10 w-16 h-16 flex items-center justify-center mb-2">
            <Linkedin className="h-8 w-8 text-linkedin" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white">Pruébalo ahora mismo.</h3>
          <p className="text-xl text-yellow-400 font-medium">
            ¡Tienes disponible {availableGenerations} generaciones gratis!
          </p>
          <p className="text-zinc-400 mt-2">
            Completa el formulario y genera mensajes personalizados que abren conversaciones reales en LinkedIn.
          </p>
          <Button className={`mt-4 ${buttonStyles.primary} ${buttonStyles.fullWidth}`} size="lg" onClick={onStartClick}>
            Comenzar ahora
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
