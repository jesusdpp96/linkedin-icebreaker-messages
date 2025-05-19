"use client";

/**
 * Smart component for the pricing section
 * Manages state and logic for the pricing section
 */
import { useRouter } from "next/navigation";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeader } from "@/components/ui/section-header";
import { PricingPlan } from "./pricing-plan";
import { useAnimation } from "@/hooks/use-animation";

export function PricingSection() {
  const sectionRef = useAnimation();
  const router = useRouter();

  const handlePlanClick = () => {
    router.push("/signin");
  };

  const scrollToAutomation = () => {
    document
      .getElementById("automation")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Basic plan features
  const basicFeatures = [
    { text: "50 mensajes por mes" },
    { text: "Análisis básico de perfiles" },
    { text: "3 categorías de mensajes" },
    { text: "Soporte por email" },
  ];

  // Professional plan features
  const professionalFeatures = [
    { text: "200 mensajes por mes" },
    { text: "Análisis avanzado de perfiles" },
    { text: "Todas las categorías de mensajes" },
    { text: "Personalización de tono" },
    { text: "Soporte prioritario" },
  ];

  // Enterprise plan features
  const enterpriseFeatures = [
    { text: "Mensajes ilimitados" },
    { text: "Análisis premium de perfiles" },
    { text: "Categorías personalizadas" },
    { text: "Integración con CRM" },
    { text: "Soporte 24/7" },
    { text: "Acceso a automatizaciones LinkedIn (Beta)", isBeta: true },
  ];

  return (
    <SectionContainer id="pricing" ref={sectionRef}>
      <SectionHeader
        badge="Precios"
        title="Planes simples y transparentes"
        subtitle="Elige el plan que mejor se adapte a tus necesidades de networking."
      />

      <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
        <PricingPlan
          title="Básico"
          price="$9"
          description="Perfecto para profesionales independientes que están comenzando con networking."
          features={basicFeatures}
          onPlanClick={handlePlanClick}
        />

        <PricingPlan
          title="Profesional"
          price="$19"
          description="Ideal para vendedores y reclutadores que necesitan conexiones de calidad."
          features={professionalFeatures}
          isPopular={true}
          onPlanClick={handlePlanClick}
        />

        <PricingPlan
          title="Empresarial"
          price="$49"
          description="Para equipos de ventas y reclutamiento con necesidades avanzadas."
          features={enterpriseFeatures}
          isBeta={true}
          onPlanClick={handlePlanClick}
          onBetaClick={scrollToAutomation}
        />
      </div>
    </SectionContainer>
  );
}
