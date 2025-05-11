/**
 * Header logo component
 * Displays the logo in the header
 */
import Link from "next/link"
import { Linkedin } from "lucide-react"

export function HeaderLogo() {
  return (
    <div className="flex items-center gap-2">
      <Linkedin className="h-6 w-6 text-linkedin" />
      <Link
        href="/"
        className="text-xl font-bold bg-gradient-to-r from-linkedin to-linkedin-light text-transparent bg-clip-text"
      >
        IceBreaker AI
      </Link>
    </div>
  )
}
