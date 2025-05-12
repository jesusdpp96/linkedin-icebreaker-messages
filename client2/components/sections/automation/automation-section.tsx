"use client"

/**
 * Smart component for the automation section
 * Manages state and logic for the automation section
 */
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { SectionContainer } from "@/components/ui/section-container"
import { SectionHeader } from "@/components/ui/section-header"
import { AutomationFeatures } from "./automation-features"
import { AutomationBenefits } from "./automation-benefits"
import { useAnimation } from "@/hooks/use-animation"

export function AutomationSection() {
  const sectionRef = useAnimation()
  const router = useRouter()

  const handleUpgradeClick = () => {
    router.push("/signin")
  }

  return (
    <SectionContainer id="automation" ref={sectionRef}>
      <SectionHeader
        badge="Próximamente"
        title="Automatiza LinkedIn. Multiplica resultados."
        subtitle="Exclusivo para usuarios del plan Empresarial"
        showBetaBadge={true}
      />

      <div className="max-w-4xl mx-auto">
        <Card className="bg-zinc-800/50 border-zinc-700 overflow-hidden">
          <CardContent className="p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <AutomationFeatures onUpgradeClick={handleUpgradeClick} />
              <AutomationBenefits />
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionContainer>
  )
}
