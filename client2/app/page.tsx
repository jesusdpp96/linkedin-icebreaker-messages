/**
 * Main landing page component
 * Assembles all sections of the landing page
 */
"use client";

import { Header } from "@/components/layout/header/header";
import { HeroSection } from "@/components/sections/hero/hero-section";
import { TryNowSection } from "@/components/sections/try-now/try-now-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { PricingSection } from "@/components/sections/pricing/pricing-section";
import { AutomationSection } from "@/components/sections/automation/automation-section";
import { CTASection } from "@/components/sections/cta-section";
import { Footer } from "@/components/layout/footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col dark bg-black text-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TryNowSection />
        <TestimonialsSection />
        <PricingSection />
        <AutomationSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
