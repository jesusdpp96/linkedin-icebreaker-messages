"use client"

/**
 * Custom hook for handling scroll to top functionality
 * Detects when user has scrolled and provides functions to scroll back to top
 */
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function useScrollTop(threshold = 300) {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const router = useRouter()

  // Detect when user has scrolled past threshold
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > threshold)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold])

  // Function to scroll to top or navigate to home page
  const scrollToTop = (isHomePage: boolean) => {
    if (isHomePage) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    } else {
      router.push("/")
    }
  }

  return {
    showScrollTop,
    scrollToTop,
  }
}
