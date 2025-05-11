/**
 * Reusable feature item component
 * Displays a feature with an icon and text
 */
import type { LucideIcon } from "lucide-react"
import { cardStyles } from "@/utils/styles"

interface FeatureItemProps {
  icon: LucideIcon
  text: string
  isBeta?: boolean
}

export function FeatureItem({ icon: Icon, text, isBeta = false }: FeatureItemProps) {
  if (isBeta) {
    return (
      <li className={cardStyles.betaFeature}>
        <Icon className={cardStyles.betaFeatureIcon} />
        <span className={cardStyles.betaFeatureText}>{text}</span>
      </li>
    )
  }

  return (
    <li className={cardStyles.featureItem}>
      <Icon className={cardStyles.featureIcon} />
      <span className={cardStyles.featureText}>{text}</span>
    </li>
  )
}
