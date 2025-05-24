import type { z } from 'zod'

export function cropString(rules: z.ZodString, value: string): string {
  if (typeof value !== 'string') {
    return value
  }

  /**
   * Jest in the tests (crop-string.spec.ts) is throwing an error with the typing of the checks,
   * so a cast to { value: number } is used to avoid the error.
   */
  const minLength =
    ((rules._def.checks.find(check => check.kind === 'min') as { value: number }) || undefined)
      ?.value || 0
  const maxLength =
    ((rules._def.checks.find(check => check.kind === 'max') as { value: number }) || undefined)
      ?.value || Infinity

  if (value.length < minLength) {
    return value
  }
  if (value.length > maxLength) {
    return value.slice(0, maxLength)
  }
  return value
}
