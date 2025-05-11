// Function to get the number of available generations
export function getAvailableGenerations(): number {
  if (typeof window === "undefined") return 3 // Default for SSR

  const stored = localStorage.getItem("availableGenerations")
  if (stored === null) {
    // First time user, set default value
    localStorage.setItem("availableGenerations", "3")
    return 3
  }

  return Number.parseInt(stored, 10)
}

// Function to decrease the number of available generations
export function useGeneration(): number {
  if (typeof window === "undefined") return 3 // Default for SSR

  const current = getAvailableGenerations()
  if (current > 0) {
    const newValue = current - 1
    localStorage.setItem("availableGenerations", newValue.toString())
    return newValue
  }
  return 0
}

// Function to reset available generations (for testing)
export function resetGenerations(value = 3): void {
  if (typeof window === "undefined") return // Skip for SSR

  localStorage.setItem("availableGenerations", value.toString())
}
