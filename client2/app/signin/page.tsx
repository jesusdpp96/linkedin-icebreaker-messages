/**
 * Sign in page component
 * Displays the sign in form
 */
"use client"

import { useState, type FormEvent } from "react"
import { Header } from "@/components/layout/header/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useFormValidation } from "@/hooks/use-form-validation"

export default function SignInPage() {
  // Form validation using custom hook
  const {
    values: formData,
    errors,
    handleChange,
    validate,
    resetForm,
  } = useFormValidation({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showServiceError, setShowServiceError] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Define validation rules
    const rules = {
      name: { required: true },
      email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      password: { required: true, minLength: 8 },
      confirmPassword: { required: true, match: "password" },
    }

    if (validate(rules)) {
      setIsSubmitting(true)

      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false)
        setShowServiceError(true)

        // Hide error message after 5 seconds
        setTimeout(() => {
          setShowServiceError(false)
        }, 5000)
      }, 1500)
    }
  }

  return (
    <div className="flex min-h-screen flex-col dark bg-black text-white">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card className="bg-zinc-800/50 border-zinc-700 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Crear cuenta</CardTitle>
              <CardDescription className="text-zinc-400 text-center">
                Ingresa tus datos para registrarte en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              {showServiceError && (
                <Alert className="mb-6 bg-red-900/30 border-red-800 text-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Lo sentimos, el servicio de registro está temporalmente fuera de servicio. Por favor, inténtalo más
                    tarde.
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Nombre completo
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-zinc-900/50 border-zinc-700 text-white"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-zinc-900/50 border-zinc-700 text-white"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Contraseña
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-zinc-900/50 border-zinc-700 text-white"
                  />
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">
                    Confirmar contraseña
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="********"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="bg-zinc-900/50 border-zinc-700 text-white"
                  />
                  {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-linkedin hover:bg-linkedin-light text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    "Registrarse"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-zinc-400 text-center">
                Al registrarte, aceptas nuestros{" "}
                <Link href="#" className="text-linkedin hover:underline">
                  Términos de servicio
                </Link>{" "}
                y{" "}
                <Link href="#" className="text-linkedin hover:underline">
                  Política de privacidad
                </Link>
              </div>
              <div className="text-sm text-zinc-400 text-center">
                ¿Ya tienes una cuenta?{" "}
                <Link href="#" className="text-linkedin hover:underline">
                  Iniciar sesión
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
