"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { usePostHog } from "posthog-js/react";
import gsap from "gsap";

export function CTASection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const posthog = usePostHog();

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  const handleCtaClick = () => {
    // Track CTA click event
    posthog.capture("click_cta", {
      cta_location: "footer_section",
      cta_text: "Comenzar gratis",
    });

    window.location.href = "#try-now";
  };

  const handleDemoClick = () => {
    // Track demo button click
    posthog.capture("click_demo", {
      cta_location: "footer_section",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-linkedin-dark/20 to-black z-0"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5 mix-blend-overlay"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-white to-zinc-300 text-transparent bg-clip-text">
              ¿Listo para romper el hielo?
            </h2>
            <p className="max-w-[600px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Únete a miles de profesionales que ya están generando conexiones
              valiosas con mensajes personalizados.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button
              size="lg"
              className="gap-1 bg-linkedin hover:bg-linkedin-light text-white border-0"
              onClick={handleCtaClick}
            >
              Comenzar gratis <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-zinc-700 text-white hover:bg-zinc-800"
              onClick={handleDemoClick}
            >
              Ver demostración
            </Button>
          </div>
          <p className="text-xs text-zinc-500">
            No se requiere tarjeta de crédito.
          </p>
        </div>
      </div>
    </section>
  );
}
