"use client"

import type React from "react"

/**
 * Header link component
 * Displays a link in the header with consistent styling
 */
import Link from "next/link"

interface HeaderLinkProps {
  href: string
  children: React.ReactNode
  onClick?: () => void
}

export function HeaderLink({ href, children, onClick }: HeaderLinkProps) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
