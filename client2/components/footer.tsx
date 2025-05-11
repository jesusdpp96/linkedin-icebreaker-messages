import Link from "next/link"
import { Linkedin, Twitter, Github, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 bg-black py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Linkedin className="h-6 w-6 text-linkedin" />
              <span className="text-xl font-bold bg-gradient-to-r from-linkedin to-linkedin-light text-transparent bg-clip-text">
                IceBreaker AI
              </span>
            </div>
            <p className="text-sm text-zinc-400">Mensajes personalizados que generan conversaciones reales.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Producto</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Características
              </Link>
              <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Precios
              </Link>
              <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Integraciones
              </Link>
              <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Novedades
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Empresa</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Sobre nosotros
              </Link>
              <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Carreras
              </Link>
              <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Contacto
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Legal</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Términos
              </Link>
              <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Privacidad
              </Link>
              <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Cookies
              </Link>
              <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Licencias
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} IceBreaker AI. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
