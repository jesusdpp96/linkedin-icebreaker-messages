/**
 * Reusable section header component
 * Provides consistent styling for section titles and subtitles
 */
import { Badge } from "@/components/ui/badge"
import { sectionStyles } from "@/utils/styles"

interface SectionHeaderProps {
  badge?: string
  title: string
  subtitle?: string
  showBetaBadge?: boolean
  className?: string
}

export function SectionHeader({ badge, title, subtitle, showBetaBadge = false, className }: SectionHeaderProps) {
  return (
    <div className={`${sectionStyles.header} ${className || ""}`}>
      <div className="space-y-2">
        {badge && (
          <div className="inline-flex items-center gap-2">
            <div className={sectionStyles.badge}>{badge}</div>
            {showBetaBadge && (
              <Badge variant="outline" className={sectionStyles.betaBadge}>
                Beta
              </Badge>
            )}
          </div>
        )}
        <h2 className={sectionStyles.title}>{title}</h2>
        {subtitle && <p className={sectionStyles.subtitle}>{subtitle}</p>}
      </div>
    </div>
  )
}
