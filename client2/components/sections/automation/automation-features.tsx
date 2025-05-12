"use client"

/**
 * Automation features component
 * Displays the main features of the automation functionality
 */
import { Button } from "@/components/ui/button"
import { MessageSquare, UserPlus, Zap } from "lucide-react"
import { buttonStyles } from "@/utils/styles"

interface AutomationFeaturesProps {
  onUpgradeClick: () => void
}

export function AutomationFeatures({ onUpgradeClick }: AutomationFeaturesProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-linkedin/10 p-3">
          <Zap className="h-6 w-6 text-linkedin" />
        </div>
        <h3 className="text-2xl font-bold text-white">Potencia tu networking</h3>
      </div>

      <p className="text-zinc-300 text-lg">
        Estamos desarrollando un sistema que automatiza tus interacciones en LinkedIn manteniendo la personalización que
        tus contactos merecen.
      </p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-linkedin" />
          <span className="text-white font-medium">Mensajes</span>
        </div>
        <div className="flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-linkedin" />
          <span className="text-white font-medium">Conexiones</span>
        </div>
      </div>

      <div className="pt-4">
        <Button className={`${buttonStyles.primary} ${buttonStyles.fullWidth}`} onClick={onUpgradeClick}>
          Acceder a la Beta
        </Button>
      </div>
    </div>
  )
}
