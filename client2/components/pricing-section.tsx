"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Zap } from "lucide-react"
import { useRef, useEffect } from "react"
import gsap from "gsap"
import { useRouter } from "next/navigation"

export function PricingSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const router = useRouter()

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
        },
      )
    }
  }, [])

  const handlePlanClick = () => {
    router.push("/signin")
  }

  const scrollToAutomation = () => {
    document.getElementById("automation")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section ref={sectionRef} id="pricing" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-linkedin-dark/20 to-black z-0"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-10 mix-blend-overlay"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-linkedin px-3 py-1 text-sm text-white">Pricing</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-white to-zinc-300 text-transparent bg-clip-text">
              Planes simples y transparentes
            </h2>
            <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Elige el plan que mejor se adapte a tus necesidades de networking. Todos incluyen una prueba gratuita de
              14 días.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
          <Card className="bg-zinc-800/50 border-zinc-700 backdrop-blur-sm hover:bg-zinc-800/80 transition-colors">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Básico</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-white">$9</span>
                <span className="text-zinc-400">/mes</span>
              </div>
              <p className="text-zinc-400 text-sm mb-6">
                Perfecto para profesionales independientes que están comenzando con networking.
              </p>
              <ul className="grid gap-3 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-linkedin" />
                  <span className="text-zinc-300">50 mensajes por mes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-linkedin" />
                  <span className="text-zinc-300">Análisis básico de perfiles</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-linkedin" />
                  <span className="text-zinc-300">3 categorías de mensajes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-linkedin" />
                  <span className="text-zinc-300">Soporte por email</span>
                </li>
              </ul>
              <Button className="w-full bg-zinc-700 hover:bg-zinc-600 text-white" onClick={handlePlanClick}>
                Comenzar
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-b from-zinc-800/80 to-zinc-900/80 border-0 relative backdrop-blur-sm hover:from-zinc-800 hover:to-zinc-900 transition-colors">
            <div className="absolute inset-0.5 rounded-lg bg-gradient-to-br from-linkedin to-linkedin-light opacity-20"></div>
            <div className="absolute inset-0 rounded-[7px] border border-linkedin/50"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Profesional</h3>
                <div className="inline-block rounded-lg bg-linkedin px-3 py-1 text-xs text-white">Popular</div>
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-white">$19</span>
                <span className="text-zinc-400">/mes</span>
              </div>
              <p className="text-zinc-400 text-sm mb-6">
                Ideal para vendedores y reclutadores que necesitan conexiones de calidad.
              </p>
              <ul className="grid gap-3 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-linkedin" />
                  <span className="text-zinc-300">200 mensajes por mes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-linkedin" />
                  <span className="text-zinc-300">Análisis avanzado de perfiles</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-linkedin" />
                  <span className="text-zinc-300">Todas las categorías de mensajes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-linkedin" />
                  <span className="text-zinc-300">Personalización de tono</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-linkedin" />
                  <span className="text-zinc-300">Soporte prioritario</span>
                </li>
              </ul>
              <Button
                className="w-full bg-linkedin hover:bg-linkedin-light text-white border-0"
                onClick={handlePlanClick}
              >
                Comenzar
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800/50 border-zinc-700 backdrop-blur-sm hover:bg-zinc-800/80 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Empresarial</h3>
                <div className="inline-block rounded-lg bg-amber-500/20 px-3 py-1 text-xs text-amber-300 border border-amber-500/30">
                  Beta Access
                </div>
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-white">$49</span>
                <span className="text-zinc-400">/mes</span>
              </div>
              <p className="text-zinc-400 text-sm mb-6">
                Para equipos de ventas y reclutamiento con necesidades avanzadas.
              </p>
              <ul className="grid gap-3 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-linkedin" />
                  <span className="text-zinc-300">Mensajes ilimitados</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-linkedin" />
                  <span className="text-zinc-300">Análisis premium de perfiles</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-linkedin" />
                  <span className="text-zinc-300">Categorías personalizadas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-linkedin" />
                  <span className="text-zinc-300">Integración con CRM</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-linkedin" />
                  <span className="text-zinc-300">Soporte 24/7</span>
                </li>
                <li className="flex items-center gap-2 bg-amber-500/10 p-2 rounded-md border border-amber-500/30">
                  <Zap className="h-4 w-4 text-amber-400" />
                  <span className="text-amber-300 font-medium">Acceso a automatizaciones LinkedIn (Beta)</span>
                </li>
              </ul>
              <div className="grid gap-2">
                <Button className="w-full bg-zinc-700 hover:bg-zinc-600 text-white" onClick={handlePlanClick}>
                  Contactar Ventas
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-amber-500/50 text-amber-300 hover:bg-amber-500/10"
                  onClick={scrollToAutomation}
                >
                  Ver funcionalidad Beta
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
