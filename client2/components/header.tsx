"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Linkedin, ArrowUp } from "lucide-react"
import { useState, useEffect } from "react"
import { MobileNav } from "./mobile-nav"
import { usePathname, useRouter } from "next/navigation"

export function Header() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === "/"

  // Detectar cuando el usuario ha hecho scroll para mostrar/ocultar el botón de volver arriba
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Función para volver al inicio de la página
  const scrollToTop = () => {
    if (isHomePage) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    } else {
      router.push("/")
    }
  }

  // Función para navegar a la página de inicio de sesión
  const navigateToSignIn = () => {
    router.push("/signin")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Linkedin className="h-6 w-6 text-linkedin" />
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-linkedin to-linkedin-light text-transparent bg-clip-text"
          >
            IceBreaker AI
          </Link>
        </div>
        <nav className="hidden md:flex gap-6">
          {isHomePage ? (
            <>
              <Link href="#try-now" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                Try Now
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Testimonials
              </Link>
              <Link href="#pricing" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="#automation" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                <span className="flex items-center gap-1">
                  Automation
                  <span className="inline-block px-1.5 py-0.5 text-[10px] font-medium bg-amber-500/20 text-amber-300 rounded-sm">
                    BETA
                  </span>
                </span>
              </Link>
            </>
          ) : (
            <Link href="/#try-now" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Volver al inicio
            </Link>
          )}
          <Link href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Blog
          </Link>
          {showScrollTop && isHomePage && (
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-sm font-medium text-linkedin hover:text-linkedin-light transition-colors"
              aria-label="Volver arriba"
            >
              <ArrowUp className="h-4 w-4" />
              <span>Top</span>
            </button>
          )}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/signin"
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors hidden sm:block"
          >
            Sign In
          </Link>
          <Button className="bg-linkedin hover:bg-linkedin-light text-white border-0" onClick={navigateToSignIn}>
            Get Started
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
