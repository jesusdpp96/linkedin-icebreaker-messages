"use client"

import type React from "react"

/**
 * Smart component for the try now section
 * Manages state and logic for the try now section
 */
import { useState, useEffect, type FormEvent } from "react"
import { SectionContainer } from "@/components/ui/section-container"
import { SectionHeader } from "@/components/ui/section-header"
import { PromoBanner } from "@/components/shared/promo-banner"
import { TryNowCTA } from "./try-now-cta"
import { TryNowBenefits } from "./try-now-benefits"
import { TryNowForm } from "./try-now-form"
import { MessageResultModal } from "@/components/shared/message-result-modal"
import { generateMessages, messageGenerationService } from "@/services/message-service"
import { useAnimation } from "@/hooks/use-animation"
import type { Message } from "@/types/message-types"

export function TryNowSection() {
  const sectionRef = useAnimation()
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
  const [generationUsed, setGenerationUsed] = useState(false)

  // Load available generations from localStorage on mount
  useEffect(() => {
    setAvailableGenerations(messageGenerationService.getAvailableGenerations())
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

  // Scroll to form
  const scrollToForm = () => {
    document.getElementById("message-form")?.scrollIntoView({ behavior: "smooth" })
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
    const apiFormData = {
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
      // Call API service
      const response = await generateMessages(apiFormData)

      // Update state with response data
      if (response.status === "success") {
        setGeneratedMessages(response.data)

        // Use a generation and update the count only after successful generation
        messageGenerationService.useGeneration()
        const remaining = messageGenerationService.getAvailableGenerations()
        setAvailableGenerations(remaining)
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

  return (
    <SectionContainer id="try-now" ref={sectionRef}>
      <SectionHeader
        badge="Prueba ahora"
        title="Genera tu primer mensaje personalizado"
        subtitle="Prueba el poder de IceBreaker AI sin necesidad de registrarte. ¡Comienza a generar conexiones valiosas ahora!"
      />

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column - CTA */}
        <div className="flex flex-col gap-6">
          <TryNowCTA availableGenerations={availableGenerations} onStartClick={scrollToForm} />
          <TryNowBenefits />
        </div>

        {/* Right Column - Form */}
        <div id="message-form" className="flex flex-col gap-6">
          <PromoBanner />
          <TryNowForm
            formData={formData}
            formErrors={formErrors}
            availableGenerations={availableGenerations}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      {/* Message Result Modal */}
      <MessageResultModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        isLoading={isLoading}
        messages={generatedMessages}
      />
    </SectionContainer>
  )
}
