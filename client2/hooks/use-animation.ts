"use client"

/**
 * Custom hook for handling GSAP animations
 * Simplifies the process of animating elements on scroll
 */
import { useEffect, useRef, type RefObject } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimationOptions {
  duration?: number
  ease?: string
  delay?: number
  start?: string
  end?: string
  toggleActions?: string
}

export function useAnimation<T extends HTMLElement>(options: AnimationOptions = {}): RefObject<T> {
  const elementRef = useRef<T>(null)

  const {
    duration = 1,
    ease = "power3.out",
    delay = 0,
    start = "top 80%",
    end = "top 50%",
    toggleActions = "play none none reverse",
  } = options

  useEffect(() => {
    const element = elementRef.current

    if (element) {
      // Create animation
      gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: element,
            start,
            end,
            toggleActions,
          },
        },
      )
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [duration, ease, delay, start, end, toggleActions])

  return elementRef
}
