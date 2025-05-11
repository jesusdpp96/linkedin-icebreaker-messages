/**
 * Try now benefits component
 * Displays the benefits of using the service
 */
export function TryNowBenefits() {
  return (
    <div className="bg-zinc-800/30 backdrop-blur-sm rounded-lg p-6 border border-zinc-700">
      <h3 className="text-xl font-bold text-white mb-4">¿Por qué usar IceBreaker AI?</h3>
      <ul className="space-y-3">
        <li className="flex items-start">
          <span className="text-linkedin mr-2">✓</span>
          <span className="text-zinc-300">Mensajes personalizados basados en perfiles reales</span>
        </li>
        <li className="flex items-start">
          <span className="text-linkedin mr-2">✓</span>
          <span className="text-zinc-300">Mayor tasa de respuesta que con mensajes genéricos</span>
        </li>
        <li className="flex items-start">
          <span className="text-linkedin mr-2">✓</span>
          <span className="text-zinc-300">Ahorra tiempo en la redacción de mensajes efectivos</span>
        </li>
        <li className="flex items-start">
          <span className="text-linkedin mr-2">✓</span>
          <span className="text-zinc-300">Mejora tus conexiones profesionales en LinkedIn</span>
        </li>
      </ul>
    </div>
  )
}
