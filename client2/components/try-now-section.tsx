"use client"

import type React from "react"

import { useState, useEffect, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { PromoBanner } from "./promo-banner"
import { AutoResizeTextarea } from "./auto-resize-textarea"
import { getAvailableGenerations, useGeneration } from "@/utils/local-storage"
import { useRef } from "react"
import gsap from "gsap"
import { Linkedin } from 'lucide-react'
import type { FormData, Message } from "@/types/message-types"
import { generateMessages } from "@/services/message-service"
import { MessageResultModal } from "./message-result-modal"

export function TryNowSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [availableGenerations, setAvailableGenerations] = useState(3)
  const [formData, setFormData] = useState({
    senderLinkedIn: "",
    problem: "",
    solution: "",
    receiverLinkedIn: "",
  })
  const [formErrors, setFormErrors] = useState({
    senderLinkedIn: "",
    receiverLinkedIn: "",
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [generatedMessages, setGeneratedMessages] = useState<Message[]>([])
  const [generationUsed, setGenerationUsed] = useState(false);

  // Load available generations from localStorage on mount
  useEffect(() => {
    setAvailableGenerations(getAvailableGenerations())
  }, [])

  // Animation effect
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }
  }, [])

  // Validate LinkedIn URL
  const validateLinkedInUrl = (url: string): boolean => {
    const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/i
    return regex.test(url)
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear errors when typing
    if (name === "senderLinkedIn" || name === "receiverLinkedIn") {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      senderLinkedIn: "",
      problem: "",
      solution: "",
      receiverLinkedIn: "",
    })
    setFormErrors({
      senderLinkedIn: "",
      receiverLinkedIn: "",
    })
  }

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false)
    resetForm()
  }

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate LinkedIn URLs
    let hasErrors = false
    const newErrors = { senderLinkedIn: "", receiverLinkedIn: "" }

    if (!validateLinkedInUrl(formData.senderLinkedIn)) {
      newErrors.senderLinkedIn = "Por favor, introduce una URL de LinkedIn válida"
      hasErrors = true
    }

    if (!validateLinkedInUrl(formData.receiverLinkedIn)) {
      newErrors.receiverLinkedIn = "Por favor, introduce una URL de LinkedIn válida"
      hasErrors = true
    }

    setFormErrors(newErrors)

    if (hasErrors) return

    // Check if user has available generations
    if (availableGenerations <= 0) {
      alert("Has agotado tus generaciones gratuitas. ¡Regístrate para obtener más!")
      return
    }

    // Prepare API request data
    const apiFormData: FormData = {
      senderUrl: formData.senderLinkedIn,
      problemDescription: formData.problem,
      solutionDescription: formData.solution,
      receiverUrl: formData.receiverLinkedIn,
    }

    // Show loading modal
    setIsLoading(true)
    setIsModalOpen(true)
    setGeneratedMessages([])

    try {
      // Call API (simulated)
      const response = await generateMessages(apiFormData)

      // Update state with response data
      if (response.status === "success") {
        setGeneratedMessages(response.data)

        // Use a generation and update the count only after successful generation
        setGenerationUsed(true);
      } else {
        throw new Error("Error generating messages")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Hubo un error al generar los mensajes. Por favor, inténtalo de nuevo.")
      setIsModalOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (generationUsed) {
      const remaining = useGeneration();
      setAvailableGenerations(remaining);
      setGenerationUsed(false);
    }
  }, [generationUsed]);

  return (
    <section ref={sectionRef} id="try-now" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-linkedin-dark/20 to-black z-0"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-10 mix-blend-overlay"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-linkedin px-3 py-1 text-sm text-white">
              Try Now
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-white to-zinc-300 text-transparent bg-clip-text">
              Genera tu primer mensaje personalizado
            </h2>
            <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Prueba el poder de IceBreaker AI sin necesidad de registrarte. ¡Comienza a generar conexiones valiosas
              ahora!
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - CTA */}
          <div className="flex flex-col gap-6">
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
                  <Button
                    className="mt-4 w-full bg-linkedin hover:bg-linkedin-light text-white border-0"
                    size="lg"
                    onClick={() => document.getElementById("message-form")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Comenzar ahora
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="bg-zinc-800/30 backdrop-blur-sm rounded-lg p-6 border border-zinc-700">
              <h3 className="text-xl font-bold text-white mb-4">¿Por qué usar IceBreaker AI?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-linkedin mr-2">✓</span>
                  <span className="text-zinc-300">Mensajes personalizados basados en perfiles reales</span>
                </li>
                <li className="flex items-start">
                  <span className="text-linkedin mr-2">✓</span>
                  <span className="text-zinc-300">Mayor tasa de respuesta que con mensajes genéricos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-linkedin mr-2">✓</span>
                  <span className="text-zinc-300">Ahorra tiempo en la redacción de mensajes efectivos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-linkedin mr-2">✓</span>
                  <span className="text-zinc-300">Mejora tus conexiones profesionales en LinkedIn</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Form */}
          <div id="message-form" className="flex flex-col gap-6">
            <PromoBanner />

            <Card className="bg-zinc-800/50 border-zinc-700 backdrop-blur-sm hover:bg-zinc-800/80 transition-colors">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="senderLinkedIn" className="text-white">
                      Tu perfil de LinkedIn
                    </Label>
                    <Input
                      id="senderLinkedIn"
                      name="senderLinkedIn"
                      placeholder="https://linkedin.com/in/tu-perfil"
                      value={formData.senderLinkedIn}
                      onChange={handleInputChange}
                      className="bg-zinc-900/50 border-zinc-700 text-white"
                      required
                    />
                    {formErrors.senderLinkedIn && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.senderLinkedIn}</p>
                    )}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                      className="bg-zinc-900/50 border-zinc-700 text-white"
                      required
                    />
                    {formErrors.receiverLinkedIn && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.receiverLinkedIn}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-linkedin hover:bg-linkedin-light text-white border-0"
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
          </div>
        </div>
      </div>

      {/* Message Result Modal */}
      <MessageResultModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        isLoading={isLoading}
        messages={generatedMessages}
      />
    </section>
  )
}
