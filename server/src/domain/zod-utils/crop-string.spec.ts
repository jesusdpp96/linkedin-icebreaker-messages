import { describe, it, expect } from '@jest/globals'
import { z } from 'zod'
import { cropString } from './crop-string'

describe('cropString', () => {
  it('should return the original value if it is not a string', () => {
    const rules = z.string()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(cropString(rules, 123 as any)).toBe(123)
  })

  it('should return the original string if it meets the min and max length constraints', () => {
    const rules = z.string().min(3).max(10)
    expect(cropString(rules, 'hello')).toBe('hello')
  })

  it('should crop the string to the max length if it exceeds the max constraint', () => {
    const rules = z.string().max(5)
    expect(cropString(rules, 'exceeding')).toBe('excee')
  })

  it('should return the original string if it is shorter than the min length', () => {
    const rules = z.string().min(5)
    expect(cropString(rules, 'hi')).toBe('hi')
  })

  it('should handle cases where no min or max constraints are defined', () => {
    const rules = z.string()
    expect(cropString(rules, 'any length')).toBe('any length')
  })

  it('should handle cases where only a min constraint is defined', () => {
    const rules = z.string().min(3)
    expect(cropString(rules, 'short')).toBe('short')
  })

  it('should handle cases where only a max constraint is defined', () => {
    const rules = z.string().max(4)
    expect(cropString(rules, 'truncate')).toBe('trun')
  })
})
