/**
 * Automation benefits component
 * Displays the benefits of the automation feature
 */
export function AutomationBenefits() {
  return (
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
          Funcionalidad en desarrollo activo. Acceso anticipado exclusivo para usuarios del plan Empresarial.
        </p>
      </div>
    </div>
  )
}
