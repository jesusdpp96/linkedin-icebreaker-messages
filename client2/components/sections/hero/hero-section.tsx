/**
 * Smart component for the hero section
 * Manages state and logic for the hero section
 */
import { SectionContainer } from "@/components/ui/section-container"
import { HeroContent } from "./hero-content"
import { MessageCarousel } from "@/components/shared/message-carousel/message-carousel"
import { carouselData } from "@/data/carousel-data"
import { useAnimation } from "@/hooks/use-animation"

export function HeroSection() {
  const sectionRef = useAnimation()

  return (
    <SectionContainer ref={sectionRef}>
      <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-6">
        {/* Left Section */}
        <HeroContent />

        {/* Right Section */}
        <div className="w-full md:w-3/5">
          <MessageCarousel slides={carouselData} />
        </div>
      </div>
    </SectionContainer>
  )
}
