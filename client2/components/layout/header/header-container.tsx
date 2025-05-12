/**
 * Header container component
 * Provides consistent styling for the header
 */
import type { ReactNode } from "react"

interface HeaderContainerProps {
  children: ReactNode
}

export function HeaderContainer({ children }: HeaderContainerProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center justify-between">{children}</div>
    </header>
  )
}
