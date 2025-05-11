"use client"

/**
 * Mobile navigation component
 * Displays a mobile-friendly navigation menu
 */
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowUp } from "lucide-react"
import { useRouter } from "next/navigation"

interface MobileNavProps {
  isHomePage: boolean
}

export function MobileNav({ isHomePage }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const scrollToTop = () => {
    if (isHomePage) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    } else {
      router.push("/")
    }
    closeMenu()
  }

  const navigateToSignIn = () => {
    router.push("/signin")
    closeMenu()
  }

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="text-white"
        onClick={toggleMenu}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
          <div className="container flex flex-col items-center justify-center h-full">
            <nav className="flex flex-col items-center gap-6 text-center">
              {isHomePage ? (
                <>
                  <Link
                    href="#try-now"
                    className="text-xl font-medium text-white hover:text-linkedin transition-colors"
                    onClick={closeMenu}
                  >
                    Prueba ahora
                  </Link>
                  <Link
                    href="#testimonials"
                    className="text-xl font-medium text-white hover:text-linkedin transition-colors"
                    onClick={closeMenu}
                  >
                    Testimonios
                  </Link>
                  <Link
                    href="#pricing"
                    className="text-xl font-medium text-white hover:text-linkedin transition-colors"
                    onClick={closeMenu}
                  >
                    Precios
                  </Link>
                  <Link
                    href="#automation"
                    className="text-xl font-medium text-white hover:text-linkedin transition-colors"
                    onClick={closeMenu}
                  >
                    <span className="flex items-center gap-1 justify-center">
                      Automatización
                      <span className="inline-block px-1.5 py-0.5 text-xs font-medium bg-amber-500/20 text-amber-300 rounded-sm">
                        BETA
                      </span>
                    </span>
                  </Link>
                </>
              ) : (
                <Link
                  href="/"
                  className="text-xl font-medium text-white hover:text-linkedin transition-colors"
                  onClick={closeMenu}
                >
                  Volver al inicio
                </Link>
              )}
              <Link
                href="#"
                className="text-xl font-medium text-white hover:text-linkedin transition-colors"
                onClick={closeMenu}
              >
                Blog
              </Link>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-xl font-medium text-linkedin hover:text-linkedin-light transition-colors"
                aria-label="Volver arriba"
              >
                <ArrowUp className="h-5 w-5" />
                <span>Volver arriba</span>
              </button>
              <div className="mt-8 flex flex-col gap-4 w-full">
                <Link
                  href="/signin"
                  className="text-lg font-medium text-zinc-400 hover:text-white transition-colors"
                  onClick={closeMenu}
                >
                  Iniciar sesión
                </Link>
                <Button
                  className="w-full bg-linkedin hover:bg-linkedin-light text-white border-0"
                  onClick={navigateToSignIn}
                >
                  Comenzar
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
