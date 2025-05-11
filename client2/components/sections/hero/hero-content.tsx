/**
 * Hero content component
 * Displays the main content of the hero section
 */
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { buttonStyles } from "@/utils/styles";

export function HeroContent() {
  return (
    <div className="w-full md:w-2/5 flex flex-col justify-center space-y-4 text-center md:text-left">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-white to-zinc-300 text-transparent bg-clip-text">
          ¡Rompe el hielo como un profesional!
        </h1>
        <p className="max-w-[800px] mx-auto md:mx-0 text-zinc-400 md:text-xl">
          Con IA, analizamos tu perfil y el de tu prospecto en LinkedIn,
          entendemos tu estilo, tu propuesta y generamos mensajes personalizados
          que abren conversaciones reales.
        </p>
      </div>
      <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center md:justify-start">
        <Button
          size="lg"
          className={`gap-1 ${buttonStyles.primary}`}
          onClick={() => (window.location.href = "#try-now")}
        >
          Prueba gratis <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-xs text-zinc-500">
        No se requiere tarjeta de crédito. Puedes realizar hasta 3 generaciones
        gratis. No hay compromiso.
      </p>
    </div>
  );
}
