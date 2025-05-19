"use client";

/**
 * Smart component for the message carousel
 * Manages state and logic for the carousel
 */
import { useEffect, useRef, useState } from "react";
import { usePostHog } from "posthog-js/react";
import { LinkedInMessageCard } from "./linkedin-message-card";
import { MessageCarouselControls } from "./message-carousel-controls";

interface MessageCarouselProps {
  slides: Array<{
    colorCategory: string;
    messageCategory: string;
    titleCategory: string;
    linkedinSimulationMessage: {
      receiverName: string;
      receiverProfilePicture: string;
      receiverHeadline: string;
      senderName: string;
      senderProfilePicture: string;
      senderHeadline: string;
      message: string;
    };
  }>;
}

export function MessageCarousel({ slides }: MessageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const posthog = usePostHog();
  const [hasTrackedView, setHasTrackedView] = useState(false);

  // Calculate previous and next indices
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  const nextIndex = (currentIndex + 1) % slides.length;

  // Start autoplay
  const startAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }

    autoplayTimerRef.current = setInterval(() => {
      if (!isPaused && !isTransitioning) {
        handleNext();
      }
    }, 3000);
  };

  // Set up autoplay on mount
  useEffect(() => {
    startAutoplay();

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isPaused, isTransitioning]);

  // Track example view when carousel is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTrackedView) {
          posthog.capture("view_examples", {
            carousel_position: "hero_section",
            message_category: slides[currentIndex].messageCategory,
          });
          setHasTrackedView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, [posthog, slides, currentIndex, hasTrackedView]);

  // Handle mouse enter on active slide
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  // Handle mouse leave on active slide
  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Navigate to previous slide
  const handlePrev = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex(prevIndex);

    // Track carousel navigation
    posthog.capture("carousel_navigation", {
      direction: "previous",
      from_index: currentIndex,
      to_index: prevIndex,
      message_category: slides[prevIndex].messageCategory,
    });

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Navigate to next slide
  const handleNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex(nextIndex);

    // Track carousel navigation
    posthog.capture("carousel_navigation", {
      direction: "next",
      from_index: currentIndex,
      to_index: nextIndex,
      message_category: slides[nextIndex].messageCategory,
    });

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Navigate to specific slide
  const handleIndicatorClick = (index: number) => {
    if (isTransitioning || index === currentIndex) return;

    setIsTransitioning(true);

    // Track carousel navigation
    posthog.capture("carousel_navigation", {
      direction: "indicator",
      from_index: currentIndex,
      to_index: index,
      message_category: slides[index].messageCategory,
    });

    setCurrentIndex(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Get transform style based on index and position
  const getTransform = (index: number) => {
    // If it's the current slide
    if (index === currentIndex) {
      return {
        transform: isPaused
          ? "translateX(0) scale(1.1)"
          : "translateX(0) scale(1)",
        zIndex: 30,
        opacity: 1,
        width: "80%",
        height: "100%",
      };
    }
    // If it's the previous slide
    else if (index === prevIndex) {
      return {
        transform: "translateX(-75%) scale(0.85)",
        zIndex: 20,
        opacity: 0.8,
        width: "40%",
        height: "85%",
      };
    }
    // If it's the next slide
    else if (index === nextIndex) {
      return {
        transform: "translateX(75%) scale(0.85)",
        zIndex: 20,
        opacity: 0.8,
        width: "40%",
        height: "85%",
      };
    }
    // For all other slides (hidden)
    else {
      return {
        transform: "translateX(0) scale(0.7)",
        zIndex: 10,
        opacity: 0,
        width: "0%",
        height: "0%",
      };
    }
  };

  return (
    <div className="w-full py-8 relative">
      {/* Carousel container */}
      <div className="relative h-[500px] overflow-hidden">
        <div
          ref={carouselRef}
          className="absolute w-full h-full flex items-center justify-center"
        >
          {/* Render all slides */}
          {slides.map((slide, index) => {
            const style = getTransform(index);
            const position =
              index === currentIndex
                ? "active"
                : index === prevIndex
                ? "prev"
                : index === nextIndex
                ? "next"
                : "hidden";

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
                onMouseEnter={
                  position === "active" ? handleMouseEnter : undefined
                }
                onMouseLeave={
                  position === "active" ? handleMouseLeave : undefined
                }
              >
                <LinkedInMessageCard
                  slide={slide}
                  isFocused={position === "active"}
                  position={position}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Carousel controls */}
      <MessageCarouselControls
        onPrev={handlePrev}
        onNext={handleNext}
        isTransitioning={isTransitioning}
        currentIndex={currentIndex}
        totalSlides={slides.length}
        onIndicatorClick={handleIndicatorClick}
      />
    </div>
  );
}
