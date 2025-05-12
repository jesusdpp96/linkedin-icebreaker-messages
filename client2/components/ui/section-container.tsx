import type React from "react"
/**
 * Reusable section container component
 * Provides consistent styling and background for sections
 */
import type { ReactNode } from "react"
import { sectionStyles } from "@/utils/styles"

interface SectionContainerProps {
  id?: string
  children: ReactNode
  className?: string
  ref?: React.RefObject<HTMLElement>
}

export function SectionContainer({ id, children, className, ref }: SectionContainerProps) {
  return (
    <section id={id} className={`${sectionStyles.wrapper} ${className || ""}`} ref={ref as any}>
      <div className={sectionStyles.background}></div>
      <div className={sectionStyles.overlay}></div>
      <div className={sectionStyles.container}>{children}</div>
    </section>
  )
}
