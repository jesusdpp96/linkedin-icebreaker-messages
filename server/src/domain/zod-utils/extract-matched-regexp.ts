import type { z } from 'zod'

export function extractMatchedRegexp(rules: z.ZodString, value: string): string {
  if (typeof value !== 'string') {
    return value
  }

  /**
   * Jest in the tests (extract-matched-regexp.spec.ts) is throwing an error with the typing of the checks,
   * so a cast to { regex: RegExp } is used to avoid the error.
   */
  const pattern = (
    rules._def.checks.find(check => check.kind === 'regex') as { regex: RegExp } | undefined
  )?.regex

  if (!pattern) {
    return value
  }

  const match = value.match(pattern)

  if (!match) {
    return value
  }

  return match[0]
}
