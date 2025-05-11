/**
 * Utility functions for styling and common style patterns
 */
import { cn } from "@/lib/utils"

/**
 * Common section container styles
 */
export const sectionStyles = {
  wrapper: "w-full py-12 md:py-24 lg:py-32 relative overflow-hidden",
  background: "absolute inset-0 bg-gradient-to-br from-linkedin-dark/20 to-black z-0",
  overlay: "absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-10 mix-blend-overlay",
  container: "container px-4 md:px-6 relative z-10",
  header: "flex flex-col items-center justify-center space-y-4 text-center mb-8",
  title:
    "text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-white to-zinc-300 text-transparent bg-clip-text",
  subtitle: "max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed",
  badge: "inline-block rounded-lg bg-linkedin px-3 py-1 text-sm text-white",
  betaBadge: "bg-amber-500/20 text-amber-300 border-amber-500/50",
}

/**
 * Card styles for consistent card appearance
 */
export const cardStyles = {
  default: "bg-zinc-800/50 border-zinc-700 backdrop-blur-sm hover:bg-zinc-800/80 transition-colors",
  highlighted:
    "bg-gradient-to-b from-zinc-800/80 to-zinc-900/80 border-0 relative backdrop-blur-sm hover:from-zinc-800 hover:to-zinc-900 transition-colors",
  highlightedBorder: "absolute inset-0 rounded-[7px] border border-linkedin/50",
  highlightedGlow: "absolute inset-0.5 rounded-lg bg-gradient-to-br from-linkedin to-linkedin-light opacity-20",
  content: "p-6",
  title: "text-xl font-bold text-white mb-2",
  description: "text-zinc-400 text-sm mb-6",
  featureList: "grid gap-3 text-sm mb-6",
  featureItem: "flex items-center gap-2",
  featureText: "text-zinc-300",
  featureIcon: "h-4 w-4 text-linkedin",
  betaFeature: "flex items-center gap-2 bg-amber-500/10 p-2 rounded-md border border-amber-500/30",
  betaFeatureIcon: "h-4 w-4 text-amber-400",
  betaFeatureText: "text-amber-300 font-medium",
}

/**
 * Button styles for consistent button appearance
 */
export const buttonStyles = {
  primary: "bg-linkedin hover:bg-linkedin-light text-white border-0",
  secondary: "bg-zinc-700 hover:bg-zinc-600 text-white",
  outline: "border-zinc-700 text-white hover:bg-zinc-800",
  beta: "border-amber-500/50 text-amber-300 hover:bg-amber-500/10",
  fullWidth: "w-full",
}

/**
 * Creates a class string for section containers
 */
export const getSectionContainerClass = (additionalClasses?: string) => {
  return cn(sectionStyles.wrapper, additionalClasses)
}

/**
 * Creates a class string for cards
 */
export const getCardClass = (variant: "default" | "highlighted" = "default", additionalClasses?: string) => {
  return cn(variant === "default" ? cardStyles.default : cardStyles.highlighted, additionalClasses)
}

/**
 * Creates a class string for buttons
 */
export const getButtonClass = (
  variant: "primary" | "secondary" | "outline" | "beta" = "primary",
  fullWidth = false,
  additionalClasses?: string,
) => {
  return cn(buttonStyles[variant], fullWidth && buttonStyles.fullWidth, additionalClasses)
}
