import { describe, it, expect } from '@jest/globals'
import { IcebreakerMessageAiResponse } from './definition'
import { RuleValidationError } from '../../base'

describe('IcebreakerMessageAiResponse', () => {
  const validPayload = {
    message: 'A'.repeat(100),
    templateTitle: 'Valid Title',
    templateCategory: 'Valid Category',
    instruction: 'A'.repeat(100),
    sourcePosts: [1, 2],
  }

  it('should create an instance with valid payload', () => {
    const instance = IcebreakerMessageAiResponse.create(validPayload)
    expect(instance).toBeInstanceOf(IcebreakerMessageAiResponse)
    expect(instance.message).toBe(validPayload.message)
  })

  it('should crop message exceeding max length', () => {
    const payload = { ...validPayload, message: 'A'.repeat(600) }
    expect(() => IcebreakerMessageAiResponse.create(payload)).toThrow(RuleValidationError)
  })

  it('should throw an error for message below min length', () => {
    const payload = { ...validPayload, message: 'Short' }
    expect(() => IcebreakerMessageAiResponse.create(payload)).toThrow(RuleValidationError)
  })

  it('should crop instruction exceeding max length', () => {
    const payload = { ...validPayload, instruction: 'A'.repeat(600) }
    const instance = IcebreakerMessageAiResponse.create(payload)
    expect(instance.instruction.length).toBe(500)
  })

  it('should throw an error for templateTitle below min length', () => {
    const payload = { ...validPayload, templateTitle: '' }
    expect(() => IcebreakerMessageAiResponse.create(payload)).toThrow(RuleValidationError)
  })

  it('should throw an error for templateCategory below min length', () => {
    const payload = { ...validPayload, templateCategory: '' }
    expect(() => IcebreakerMessageAiResponse.create(payload)).toThrow(RuleValidationError)
  })

  it('should throw an error for instruction below min length', () => {
    const payload = { ...validPayload, instruction: '' }
    expect(() => IcebreakerMessageAiResponse.create(payload)).toThrow(RuleValidationError)
  })
})
