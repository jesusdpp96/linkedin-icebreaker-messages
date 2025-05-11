"use client"

import { useEffect, useRef, useState } from "react"
import { LinkedInMessageCard } from "./linkedin-message-card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface MessageCarouselProps {
  slides: Array<{
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
  }>
}

export function MessageCarousel({ slides }: MessageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Calcular el índice anterior y siguiente
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length
  const nextIndex = (currentIndex + 1) % slides.length

  // Iniciar el autoplay
  const startAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current)
    }

    autoplayTimerRef.current = setInterval(() => {
      if (!isPaused && !isTransitioning) {
        handleNext()
      }
    }, 3000)
  }

  // Configurar el autoplay al montar el componente
  useEffect(() => {
    startAutoplay()

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
      }
    }
  }, [isPaused, isTransitioning])

  // Manejar el hover en el slide activo
  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  // Manejar cuando se quita el hover del slide activo
  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  // Navegar al slide anterior
  const handlePrev = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex(prevIndex)

    // Restablecer el estado de transición después de que se complete la animación
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  // Navegar al slide siguiente
  const handleNext = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex(nextIndex)

    // Restablecer el estado de transición después de que se complete la animación
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  // Función para obtener la posición de transformación basada en el índice y la posición
  const getTransform = (index: number) => {
    // Si es el slide actual
    if (index === currentIndex) {
      return {
        transform: isPaused ? "translateX(0) scale(1.1)" : "translateX(0) scale(1)",
        zIndex: 30,
        opacity: 1,
        width: "80%",
        height: "100%",
      }
    }
    // Si es el slide anterior
    else if (index === prevIndex) {
      return {
        transform: "translateX(-75%) scale(0.85)",
        zIndex: 20,
        opacity: 0.8,
        width: "40%",
        height: "85%",
      }
    }
    // Si es el slide siguiente
    else if (index === nextIndex) {
      return {
        transform: "translateX(75%) scale(0.85)",
        zIndex: 20,
        opacity: 0.8,
        width: "40%",
        height: "85%",
      }
    }
    // Para todos los demás slides (ocultos)
    else {
      return {
        transform: "translateX(0) scale(0.7)",
        zIndex: 10,
        opacity: 0,
        width: "0%",
        height: "0%",
      }
    }
  }

  return (
    <div className="w-full py-8 relative">
      {/* Botones de navegación */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
        aria-label="Slide anterior"
        disabled={isTransitioning}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
        aria-label="Slide siguiente"
        disabled={isTransitioning}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Contenedor del carousel */}
      <div className="relative h-[500px] overflow-hidden">
        <div ref={carouselRef} className="absolute w-full h-full flex items-center justify-center">
          {/* Renderizar todos los slides */}
          {slides.map((slide, index) => {
            const style = getTransform(index)
            const position =
              index === currentIndex ? "active" : index === prevIndex ? "prev" : index === nextIndex ? "next" : "hidden"

            return (
              <div
                key={index}
                className="absolute transition-all duration-500 ease-in-out flex items-center justify-center"
                style={{
                  ...style,
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) ${style.transform}`,
                }}
                onMouseEnter={position === "active" ? handleMouseEnter : undefined}
                onMouseLeave={position === "active" ? handleMouseLeave : undefined}
              >
                <LinkedInMessageCard slide={slide} isFocused={position === "active"} position={position} />
              </div>
            )
          })}
        </div>
      </div>

      {/* Indicadores del carousel */}
      <div className="flex justify-center mt-6 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-linkedin" : "w-2 bg-gray-300"
            }`}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true)
                setCurrentIndex(index)
                setTimeout(() => {
                  setIsTransitioning(false)
                }, 500)
              }
            }}
            aria-label={`Ir al slide ${index + 1}`}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </div>
  )
}
