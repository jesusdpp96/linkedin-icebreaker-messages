"use client"

/**
 * Promo banner component
 * Displays a promotional banner with a counter
 */
import { useEffect, useState } from "react"

const getRandomIncrement = () => Math.floor(Math.random() * 3) // between 0 and 2

export function PromoBanner() {
  const [count, setCount] = useState(1128) // initial number

  useEffect(() => {
    // Update count at random intervals
    const interval = setInterval(
      () => {
        const increments = Math.random() > 0.5 ? getRandomIncrement() + 1 : 1 // sometimes 3, sometimes 1
        setCount((prev) => prev + increments)
      },
      Math.random() * 2000 + 3000,
    ) // update every 3-5 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Create flying fire emoji animation when count changes
    const flyingFire = document.createElement("div")
    flyingFire.textContent = "🔥"
    flyingFire.style.position = "absolute"
    flyingFire.style.fontSize = "2rem"
    flyingFire.style.animation = "fly 2s ease-out forwards"
    flyingFire.style.pointerEvents = "none"
    flyingFire.style.left = `${Math.random() * 100}%`
    flyingFire.style.top = "100%"
    flyingFire.style.zIndex = "50"

    // Add the animation to the document if it doesn't exist
    if (!document.querySelector("style#fire-animation")) {
      const style = document.createElement("style")
      style.id = "fire-animation"
      style.textContent = `
        @keyframes fly {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-200px);
            opacity: 0;
          }
        }
      `
      document.head.appendChild(style)
    }

    document.body.appendChild(flyingFire)

    setTimeout(() => {
      document.body.removeChild(flyingFire)
    }, 2000)
  }, [count])

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-zinc-800/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-700">
      <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
        <h3 className="text-2xl md:text-3xl font-bold text-white">Pruébalo ahora mismo.</h3>
        <p className="text-lg text-linkedin-light mt-2 font-medium">¡Las primeras 3 generaciones son gratis!</p>
      </div>
      <div className="min-w-[140px] text-center bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 p-3 rounded-lg font-bold shadow-inner border border-zinc-700">
        <div className="text-3xl font-bold leading-none">🔥 {count.toLocaleString()}</div>
        <div className="text-sm text-zinc-300 mt-1">mensajes generados...</div>
      </div>
    </div>
  )
}
