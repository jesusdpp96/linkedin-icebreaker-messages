"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, UserPlus, Zap } from "lucide-react"
import gsap from "gsap"
import { useRouter } from "next/navigation"

export function AutomationSection() {
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

  const handleUpgradeClick = () => {
    router.push("/signin")
  }

  return (
    <section ref={sectionRef} id="automation" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-linkedin-dark/20 to-black z-0"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-10 mix-blend-overlay"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2">
              <div className="inline-block rounded-lg bg-linkedin px-3 py-1 text-sm text-white">Próximamente</div>
              <Badge variant="outline" className="bg-amber-500/20 text-amber-300 border-amber-500/50">
                Beta
              </Badge>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-white to-zinc-300 text-transparent bg-clip-text">
              Automatiza LinkedIn. Multiplica resultados.
            </h2>
            <p className="max-w-[700px] text-zinc-400 md:text-xl/relaxed">
              Exclusivo para usuarios del plan Empresarial
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-zinc-800/50 border-zinc-700 overflow-hidden">
            <CardContent className="p-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-linkedin/10 p-3">
                      <Zap className="h-6 w-6 text-linkedin" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Potencia tu networking</h3>
                  </div>

                  <p className="text-zinc-300 text-lg">
                    Estamos desarrollando un sistema que automatiza tus interacciones en LinkedIn manteniendo la
                    personalización que tus contactos merecen.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-linkedin" />
                      <span className="text-white font-medium">Mensajes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserPlus className="h-5 w-5 text-linkedin" />
                      <span className="text-white font-medium">Conexiones</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      className="w-full bg-linkedin hover:bg-linkedin-light text-white border-0"
                      onClick={handleUpgradeClick}
                    >
                      Acceder a la Beta
                    </Button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-zinc-900/80 to-black/80 rounded-lg p-6 border border-zinc-700/50 flex flex-col justify-center">
                  <h4 className="text-xl font-bold text-white mb-4">¿Por qué automatizar?</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-linkedin font-bold">→</span>
                      <span className="text-zinc-300">Ahorra hasta 15 horas semanales en tareas repetitivas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-linkedin font-bold">→</span>
                      <span className="text-zinc-300">Mantén el control con límites personalizables</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-linkedin font-bold">→</span>
                      <span className="text-zinc-300">Aumenta tu tasa de respuesta con mensajes personalizados</span>
                    </li>
                  </ul>
                  <div className="mt-6 bg-amber-500/10 rounded-md p-3 border border-amber-500/30">
                    <p className="text-amber-300 text-sm font-medium">
                      Funcionalidad en desarrollo activo. Acceso anticipado exclusivo para usuarios del plan
                      Empresarial.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
