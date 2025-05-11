"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Zap, Check } from "lucide-react"
import { useRef, useEffect } from "react"
import gsap from "gsap"

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

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

  return (
    <section ref={sectionRef} id="features" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black z-0"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-10 mix-blend-overlay"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 text-sm text-white">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-white to-zinc-300 text-transparent bg-clip-text">
              Mensajes personalizados que generan respuestas
            </h2>
            <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              IceBreaker AI combina análisis de perfiles con IA avanzada para crear mensajes que realmente conectan con
              tus prospectos.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-zinc-800/50 border-zinc-700 backdrop-blur-sm hover:bg-zinc-800/80 transition-colors h-full">
            <CardContent className="p-6">
              <div className="rounded-full bg-purple-500/10 w-12 h-12 flex items-center justify-center mb-4">
                <Linkedin className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Análisis de Perfiles</h3>
              <p className="text-sm text-zinc-400">
                Analizamos tanto tu perfil como el de tu prospecto para entender intereses, experiencia y puntos de
                conexión.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800/50 border-zinc-700 backdrop-blur-sm hover:bg-zinc-800/80 transition-colors h-full">
            <CardContent className="p-6">
              <div className="rounded-full bg-purple-500/10 w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">IA Personalizada</h3>
              <p className="text-sm text-zinc-400">
                Nuestra IA aprende tu estilo de comunicación y adapta los mensajes para que suenen auténticamente como
                tú.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800/50 border-zinc-700 backdrop-blur-sm hover:bg-zinc-800/80 transition-colors h-full">
            <CardContent className="p-6">
              <div className="rounded-full bg-purple-500/10 w-12 h-12 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mensajes que Funcionan</h3>
              <p className="text-sm text-zinc-400">
                Generamos mensajes con contexto real, preguntas relevantes y un tono profesional que invita a la
                respuesta.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
