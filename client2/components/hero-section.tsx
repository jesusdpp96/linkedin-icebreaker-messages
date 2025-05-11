"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import { MessageCarousel } from "./message-carousel";
import { carouselData } from "@/data/carousel-data";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

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

  return (
    <section
      ref={sectionRef}
      className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-linkedin-dark/20 to-black z-0"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-10 mix-blend-overlay"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-6">
          {/* Left Section */}
          <div className="w-full md:w-2/5 flex flex-col justify-center space-y-4 text-center md:text-left">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-white to-zinc-300 text-transparent bg-clip-text">
                ¡Rompe el hielo como un profesional!
              </h1>
              <p className="max-w-[800px] mx-auto md:mx-0 text-zinc-400 md:text-xl">
                Con IA, analizamos tu perfil y el de tu prospecto en LinkedIn,
                entendemos tu estilo, tu propuesta y generamos mensajes
                personalizados que abren conversaciones reales.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center md:justify-start">
              <Button
                size="lg"
                className="gap-1 bg-gradient-to-r from-linkedin to-linkedin-light hover:from-linkedin-dark hover:to-linkedin text-white border-0"
              >
                Start for free <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-zinc-700 text-white hover:bg-zinc-800"
              >
                Book a demo
              </Button>
            </div>
            <p className="text-xs text-zinc-500">
              No credit card required. 14-day free trial.
            </p>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-3/5">
            <MessageCarousel slides={carouselData} />
          </div>
        </div>
      </div>
    </section>
  );
}
