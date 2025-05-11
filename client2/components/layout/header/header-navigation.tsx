"use client"

/**
 * Header navigation component
 * Displays the navigation links in the header
 */
import { ArrowUp } from "lucide-react"
import { HeaderLink } from "./header-link"

interface HeaderNavigationProps {
  isHomePage: boolean
  showScrollTop: boolean
  onScrollTop: () => void
}

export function HeaderNavigation({ isHomePage, showScrollTop, onScrollTop }: HeaderNavigationProps) {
  return (
    <nav className="hidden md:flex gap-6">
      {isHomePage ? (
        <>
          <HeaderLink href="#try-now">Prueba ahora</HeaderLink>
          <HeaderLink href="#testimonials">Testimonios</HeaderLink>
          <HeaderLink href="#pricing">Precios</HeaderLink>
          <HeaderLink href="#automation">
            <span className="flex items-center gap-1">
              Automatización
              <span className="inline-block px-1.5 py-0.5 text-[10px] font-medium bg-amber-500/20 text-amber-300 rounded-sm">
                BETA
              </span>
            </span>
          </HeaderLink>
        </>
      ) : (
        <HeaderLink href="/#try-now">Volver al inicio</HeaderLink>
      )}
      <HeaderLink href="#">Blog</HeaderLink>
      {showScrollTop && isHomePage && (
        <button
          onClick={onScrollTop}
          className="flex items-center gap-1 text-sm font-medium text-linkedin hover:text-linkedin-light transition-colors"
          aria-label="Volver arriba"
        >
          <ArrowUp className="h-4 w-4" />
          <span>Arriba</span>
        </button>
      )}
    </nav>
  )
}
