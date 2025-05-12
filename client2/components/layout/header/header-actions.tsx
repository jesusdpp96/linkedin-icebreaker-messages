"use client"

/**
 * Header actions component
 * Displays the action buttons in the header
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { buttonStyles } from "@/utils/styles"

interface HeaderActionsProps {
  onSignInClick: () => void
}

export function HeaderActions({ onSignInClick }: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-4">
      <Link
        href="/signin"
        className="text-sm font-medium text-zinc-400 hover:text-white transition-colors hidden sm:block"
      >
        Sign In
      </Link>
      <Button className={buttonStyles.primary} onClick={onSignInClick}>
        Comenzar
      </Button>
    </div>
  )
}
