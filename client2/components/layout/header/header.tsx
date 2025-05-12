"use client"

/**
 * Smart component for the header
 * Manages state and logic for the header
 */
import { usePathname, useRouter } from "next/navigation"
import { HeaderContainer } from "./header-container"
import { HeaderLogo } from "./header-logo"
import { HeaderNavigation } from "./header-navigation"
import { HeaderActions } from "./header-actions"
import { MobileNav } from "./mobile-nav"
import { useScrollTop } from "@/hooks/use-scroll-top"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === "/"
  const { showScrollTop, scrollToTop } = useScrollTop()

  const handleScrollTop = () => {
    scrollToTop(isHomePage)
  }

  const handleSignInClick = () => {
    router.push("/signin")
  }

  return (
    <HeaderContainer>
      <HeaderLogo />
      <HeaderNavigation isHomePage={isHomePage} showScrollTop={showScrollTop} onScrollTop={handleScrollTop} />
      <HeaderActions onSignInClick={handleSignInClick} />
      <MobileNav isHomePage={isHomePage} />
    </HeaderContainer>
  )
}
