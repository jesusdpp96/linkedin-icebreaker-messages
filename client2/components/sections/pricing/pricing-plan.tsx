"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Zap } from "lucide-react"
import { cardStyles, buttonStyles } from "@/utils/styles"

interface PricingFeature {
  text: string
  isBeta?: boolean
}

interface PricingPlanProps {
  title: string
  price: string
  description: string
  features: PricingFeature[]
  isPopular?: boolean
  isBeta?: boolean
  onPlanClick: () => void
  onBetaClick?: () => void
}

export function PricingPlan({
  title,
  price,
  description,
  features,
  isPopular = false,
  isBeta = false,
  onPlanClick,
  onBetaClick,
}: PricingPlanProps) {
  // Determine card style based on whether it's the popular plan
  const cardClassName = isPopular ? cardStyles.highlighted : cardStyles.default

  return (
    <Card className={cardClassName}>
      {isPopular && (
        <>
          <div className={cardStyles.highlightedGlow}></div>
          <div className={cardStyles.highlightedBorder}></div>
        </>
      )}
      <CardContent className={`${cardStyles.content} relative`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className={cardStyles.title}>{title}</h3>
          {isPopular && <div className="inline-block rounded-lg bg-linkedin px-3 py-1 text-xs text-white">Popular</div>}
          {isBeta && (
            <div className="inline-block rounded-lg bg-amber-500/20 px-3 py-1 text-xs text-amber-300 border border-amber-500/30">
              Beta Access
            </div>
          )}
        </div>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-3xl font-bold text-white">{price}</span>
          <span className="text-zinc-400">/mes</span>
        </div>
        <p className={cardStyles.description}>{description}</p>
        <ul className={cardStyles.featureList}>
          {features.map((feature, index) => (
            <li key={index} className={feature.isBeta ? cardStyles.betaFeature : cardStyles.featureItem}>
              {feature.isBeta ? (
                <Zap className={cardStyles.betaFeatureIcon} />
              ) : (
                <Check className={cardStyles.featureIcon} />
              )}
              <span className={feature.isBeta ? cardStyles.betaFeatureText : cardStyles.featureText}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        <div className={isBeta ? "grid gap-2" : ""}>
          <Button
            className={`${isBeta || !isPopular ? buttonStyles.secondary : buttonStyles.primary} ${buttonStyles.fullWidth}`}
            onClick={onPlanClick}
          >
            {isBeta ? "Contactar Ventas" : "Comenzar"}
          </Button>
          {isBeta && onBetaClick && (
            <Button
              variant="outline"
              className={`${buttonStyles.beta} ${buttonStyles.fullWidth}`}
              onClick={onBetaClick}
            >
              Ver funcionalidad Beta
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
