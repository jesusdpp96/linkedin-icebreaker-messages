"use client"

import type React from "react"

/**
 * Try now form component
 * Displays the form for generating messages
 */
import type { FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { AutoResizeTextarea } from "@/components/shared/auto-resize-textarea"
import { buttonStyles } from "@/utils/styles"

interface TryNowFormProps {
  formData: {
    senderLinkedIn: string
    problem: string
    solution: string
    receiverLinkedIn: string
  }
  formErrors: {
    senderLinkedIn: string
    receiverLinkedIn: string
  }
  availableGenerations: number
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSubmit: (e: FormEvent) => void
}

export function TryNowForm({ formData, formErrors, availableGenerations, onInputChange, onSubmit }: TryNowFormProps) {
  return (
    <Card className="bg-zinc-800/50 border-zinc-700 backdrop-blur-sm hover:bg-zinc-800/80 transition-colors">
      <CardContent className="p-6">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="senderLinkedIn" className="text-white">
              Tu perfil de LinkedIn
            </Label>
            <Input
              id="senderLinkedIn"
              name="senderLinkedIn"
              placeholder="https://linkedin.com/in/tu-perfil"
              value={formData.senderLinkedIn}
              onChange={onInputChange}
              className="bg-zinc-900/50 border-zinc-700 text-white"
              required
            />
            {formErrors.senderLinkedIn && <p className="text-red-500 text-sm mt-1">{formErrors.senderLinkedIn}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="problem" className="text-white">
              Problema que resuelves
            </Label>
            <AutoResizeTextarea
              id="problem"
              name="problem"
              placeholder="Describe el problema que tu producto o servicio resuelve..."
              value={formData.problem}
              onChange={onInputChange}
              className="bg-zinc-900/50 border-zinc-700 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="solution" className="text-white">
              Solución que ofreces
            </Label>
            <AutoResizeTextarea
              id="solution"
              name="solution"
              placeholder="Describe cómo tu producto o servicio soluciona el problema..."
              value={formData.solution}
              onChange={onInputChange}
              className="bg-zinc-900/50 border-zinc-700 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="receiverLinkedIn" className="text-white">
              Perfil de LinkedIn del destinatario
            </Label>
            <Input
              id="receiverLinkedIn"
              name="receiverLinkedIn"
              placeholder="https://linkedin.com/in/destinatario"
              value={formData.receiverLinkedIn}
              onChange={onInputChange}
              className="bg-zinc-900/50 border-zinc-700 text-white"
              required
            />
            {formErrors.receiverLinkedIn && <p className="text-red-500 text-sm mt-1">{formErrors.receiverLinkedIn}</p>}
          </div>

          <Button
            type="submit"
            className={`${buttonStyles.primary} ${buttonStyles.fullWidth}`}
            size="lg"
            disabled={availableGenerations <= 0}
          >
            {availableGenerations > 0 ? "Generar mensaje" : "Sin generaciones disponibles"}
          </Button>

          {availableGenerations <= 0 && (
            <p className="text-center text-amber-400 text-sm mt-2">
              Has agotado tus generaciones gratuitas. ¡Regístrate para obtener más!
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
