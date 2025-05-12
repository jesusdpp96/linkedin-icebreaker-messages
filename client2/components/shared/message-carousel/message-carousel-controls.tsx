"use client"

/**
 * Message carousel controls component
 * Displays navigation controls for the carousel
 */
import { ChevronLeft, ChevronRight } from "lucide-react"

interface MessageCarouselControlsProps {
  onPrev: () => void
  onNext: () => void
  isTransitioning: boolean
  currentIndex: number
  totalSlides: number
  onIndicatorClick: (index: number) => void
}

export function MessageCarouselControls({
  onPrev,
  onNext,
  isTransitioning,
  currentIndex,
  totalSlides,
  onIndicatorClick,
}: MessageCarouselControlsProps) {
  return (
    <>
      {/* Navigation buttons */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
        aria-label="Slide anterior"
        disabled={isTransitioning}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
        aria-label="Slide siguiente"
        disabled={isTransitioning}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-linkedin" : "w-2 bg-gray-300"
            }`}
            onClick={() => onIndicatorClick(index)}
            aria-label={`Ir al slide ${index + 1}`}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </>
  )
}
