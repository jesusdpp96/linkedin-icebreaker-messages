"use client";

import type React from "react";

/**
 * Smart component for the try now section
 * Manages state and logic for the try now section
 */
import { useState, useEffect, type FormEvent } from "react";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeader } from "@/components/ui/section-header";
import { PromoBanner } from "@/components/shared/promo-banner";
import { TryNowCTA } from "./try-now-cta";
import { TryNowBenefits } from "./try-now-benefits";
import { TryNowForm } from "./try-now-form";
import { MessageResultModal } from "@/components/shared/message-result-modal";
import { messageGenerationService } from "@/services/message-service";
import { useAnimation } from "@/hooks/use-animation";
import type { Message } from "@/types/message-types";
import { useIcebreakerMessages } from "@/hooks/use-icebreaker-messages";
import { getErrorMessage } from "@/services/error-messages";
import { usePostHog } from "posthog-js/react";

export function TryNowSection() {
  const { messages, loading, error, fetchMessages, reset } =
    useIcebreakerMessages();
  const sectionRef = useAnimation();
  const [availableGenerations, setAvailableGenerations] = useState(3);
  const [formData, setFormData] = useState({
    senderLinkedIn: "",
    problem: "",
    solution: "",
    receiverLinkedIn: "",
  });
  const [formErrors, setFormErrors] = useState({
    senderLinkedIn: "",
    receiverLinkedIn: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedMessages, setGeneratedMessages] = useState<Message[]>([]);
  const [generationUsed, setGenerationUsed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [generationStartTime, setGenerationStartTime] = useState<number | null>(
    null
  );
  const posthog = usePostHog();
  const [hasGenerated, setHasGenerated] = useState(false);

  // Load available generations from localStorage on mount
  useEffect(() => {
    setAvailableGenerations(messageGenerationService.getAvailableGenerations());
  }, []);

  // Validate LinkedIn URL
  const validateLinkedInUrl = (url: string): boolean => {
    const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/i;
    return regex.test(url);
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear errors when typing
    if (name === "senderLinkedIn" || name === "receiverLinkedIn") {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      senderLinkedIn: "",
      problem: "",
      solution: "",
      receiverLinkedIn: "",
    });
    setFormErrors({
      senderLinkedIn: "",
      receiverLinkedIn: "",
    });
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // Track modal abandonment
  useEffect(() => {
    let abandonmentTimeout: NodeJS.Timeout | null = null;

    if (isLoading && generationStartTime) {
      // Set a timeout to detect if user leaves the page during loading
      abandonmentTimeout = setTimeout(() => {
        // This will only run if the component is unmounted before loading completes
      }, 30000); // 30 seconds timeout
    }

    return () => {
      if (abandonmentTimeout) {
        clearTimeout(abandonmentTimeout);
      }

      // If modal is open, loading is active, and component unmounts, track abandonment
      if (isLoading && generationStartTime) {
        const timeWaited = Date.now() - generationStartTime;
        posthog.capture("abandon_during_loading", {
          time_waited_ms: timeWaited,
        });
      }
    };
  }, [isLoading, generationStartTime, posthog]);

  // Scroll to form
  const scrollToForm = () => {
    document
      .getElementById("message-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    // Validate LinkedIn URLs
    let hasErrors = false;
    const newErrors = { senderLinkedIn: "", receiverLinkedIn: "" };

    if (!validateLinkedInUrl(formData.senderLinkedIn)) {
      newErrors.senderLinkedIn =
        "Por favor, introduce una URL de LinkedIn válida";
      hasErrors = true;
    }

    if (!validateLinkedInUrl(formData.receiverLinkedIn)) {
      newErrors.receiverLinkedIn =
        "Por favor, introduce una URL de LinkedIn válida";
      hasErrors = true;
    }

    setFormErrors(newErrors);

    if (hasErrors) return;

    // Check if user has available generations
    if (availableGenerations <= 0) {
      alert(
        "Has agotado tus generaciones gratuitas. ¡Regístrate para obtener más!"
      );
      return;
    }

    // Set generation start time for tracking
    setGenerationStartTime(Date.now());

    // Prepare API request data
    const apiFormData = {
      senderUrl: formData.senderLinkedIn,
      problemDescription: formData.problem,
      solutionDescription: formData.solution,
      receiverUrl: formData.receiverLinkedIn,
    };

    try {
      // Call API service
      await fetchMessages(apiFormData);
    } catch (error) {
      console.error("Error:", error);

      // Track generation error
      posthog.capture("generation_error", {
        error_type: error instanceof Error ? error.name : "unknown",
        error_message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
      setIsModalOpen(true);
      setGeneratedMessages([]);
      return;
    }

    if (error) {
      setIsLoading(false);
      setIsModalOpen(false);
      setErrorMessage(getErrorMessage(error));

      // Track generation error
      posthog.capture("generation_error", {
        error_type: error,
        error_message: getErrorMessage(error),
      });

      return;
    }

    if (messages) {
      const endTime = Date.now();
      setIsLoading(false);
      setGeneratedMessages(messages);

      // Use a generation and update the count only after successful generation
      if (!hasGenerated) {
        messageGenerationService.useGeneration();
        setHasGenerated(true);
      }
      const remaining = messageGenerationService.getAvailableGenerations();
      setAvailableGenerations(remaining);

      // Track successful generation
      if (generationStartTime) {
        const generationDuration = endTime - generationStartTime;

        posthog.capture("generation_complete", {
          generation_count: 3 - remaining, // Based on starting with 3 free generations
          message_count: messages.length,
          duration_ms: generationDuration,
        });

        posthog.capture("generation_time", {
          duration_ms: generationDuration,
        });

        // Track messages per session
        posthog.capture("session_messages", {
          message_count: messages.length,
        });
      }
    }
  }, [loading, error, messages, generationStartTime, posthog, hasGenerated]);

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
          <PromoBanner />
          <TryNowBenefits />
        </div>

        {/* Right Column - Form */}
        <div id="message-form" className="flex flex-col gap-6">
          <TryNowCTA
            availableGenerations={availableGenerations}
            onStartClick={scrollToForm}
          />
          <TryNowForm
            formData={formData}
            formErrors={formErrors}
            availableGenerations={availableGenerations}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />
          {errorMessage && (
            <div className="p-4 text-red-700 bg-red-100 border border-red-300 rounded">
              {errorMessage}
            </div>
          )}
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
  );
}
