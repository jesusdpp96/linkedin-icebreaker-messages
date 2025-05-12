"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { useRef, useEffect } from "react"
import gsap from "gsap"

export function TestimonialsSection() {
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
    <section ref={sectionRef} id="testimonials" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-linkedin-dark/20 to-black z-0"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-10 mix-blend-overlay"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-linkedin px-3 py-1 text-sm text-white">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-white to-zinc-300 text-transparent bg-clip-text">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Profesionales de ventas, reclutamiento y networking ya están mejorando sus conexiones con IceBreaker AI.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
          <Card className="bg-zinc-800/30 border-linkedin/50 backdrop-blur-sm hover:bg-zinc-800/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-linkedin to-linkedin-light rounded-full blur opacity-70"></div>
                  <Image
                    src="https://randomuser.me/api/portraits/women/32.jpg"
                    width={40}
                    height={40}
                    alt="María López"
                    className="relative rounded-full border border-zinc-700"
                  />
                </div>
                <div>
                  <h3 className="text-base text-white font-semibold">María López</h3>
                  <p className="text-zinc-400 text-sm">Sales Development Rep</p>
                </div>
              </div>
              <p className="text-sm text-zinc-300">
                "Mis tasas de respuesta aumentaron un 40% desde que uso IceBreaker AI. Los mensajes son personalizados y
                naturales, exactamente como los escribiría yo, pero mucho más efectivos."
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800/30 border-zinc-700 backdrop-blur-sm hover:bg-zinc-800/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-linkedin to-linkedin-light rounded-full blur opacity-25"></div>
                  <Image
                    src="https://randomuser.me/api/portraits/men/54.jpg"
                    width={40}
                    height={40}
                    alt="Carlos Mendoza"
                    className="relative rounded-full border border-zinc-700"
                  />
                </div>
                <div>
                  <h3 className="text-base text-white font-semibold">Carlos Mendoza</h3>
                  <p className="text-zinc-400 text-sm">Recruiter Tech</p>
                </div>
              </div>
              <p className="text-sm text-zinc-300">
                "Como reclutador, necesito conectar con muchos candidatos a diario. IceBreaker AI me ahorra horas de
                trabajo y mis mensajes ahora generan conversaciones reales con los talentos que busco."
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800/30 border-zinc-700 backdrop-blur-sm hover:bg-zinc-800/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-linkedin to-linkedin-light rounded-full blur opacity-25"></div>
                  <Image
                    src="https://randomuser.me/api/portraits/women/28.jpg"
                    width={40}
                    height={40}
                    alt="Laura Sánchez"
                    className="relative rounded-full border border-zinc-700"
                  />
                </div>
                <div>
                  <h3 className="text-base text-white font-semibold">Laura Sánchez</h3>
                  <p className="text-zinc-400 text-sm">Emprendedora</p>
                </div>
              </div>
              <p className="text-sm text-zinc-300">
                "Siempre me costó hacer networking en LinkedIn. Con IceBreaker AI, mis mensajes son relevantes y
                personalizados. He conseguido reuniones con personas que antes ni me respondían."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
