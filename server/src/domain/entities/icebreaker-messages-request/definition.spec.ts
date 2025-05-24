import { describe, it, expect } from '@jest/globals'
import { IcebreakerMessagesRequest } from './definition'
import { RuleValidationError } from '../../base'

describe('IcebreakerMessagesRequest.create()', () => {
  const validPayload = {
    senderLinkedinUrl: 'https://linkedin.com/in/sender',
    problemDescription: 'This is a valid problem description.',
    solutionDescription: 'This is a valid solution description.',
    receiverLinkedinUrl: 'https://linkedin.com/in/receiver',
  }

  it('should create an instance with valid payload', () => {
    const instance = IcebreakerMessagesRequest.create(validPayload)
    expect(instance).toBeInstanceOf(IcebreakerMessagesRequest)
    expect(instance.toJSON()).toEqual(validPayload)
  })

  it('should throw an error for invalid senderLinkedinUrl', () => {
    const invalidPayload = { ...validPayload, senderLinkedinUrl: 'invalid-url' }
    expect(() => IcebreakerMessagesRequest.create(invalidPayload)).toThrow(RuleValidationError)
  })

  it('should throw an error for invalid receiverLinkedinUrl', () => {
    const invalidPayload = { ...validPayload, receiverLinkedinUrl: 'invalid-url' }
    expect(() => IcebreakerMessagesRequest.create(invalidPayload)).toThrow(RuleValidationError)
  })

  it('should throw an error for empty problemDescription', () => {
    const invalidPayload = { ...validPayload, problemDescription: '' }
    expect(() => IcebreakerMessagesRequest.create(invalidPayload)).toThrow(RuleValidationError)
  })

  it('should throw an error for problemDescription exceeding 1500 characters', () => {
    const invalidPayload = { ...validPayload, problemDescription: 'a'.repeat(1501) }
    expect(() => IcebreakerMessagesRequest.create(invalidPayload)).toThrow(RuleValidationError)
  })

  it('should throw an error for empty solutionDescription', () => {
    const invalidPayload = { ...validPayload, solutionDescription: '' }
    expect(() => IcebreakerMessagesRequest.create(invalidPayload)).toThrow(RuleValidationError)
  })

  it('should throw an error for solutionDescription exceeding 1500 characters', () => {
    const invalidPayload = { ...validPayload, solutionDescription: 'a'.repeat(1501) }
    expect(() => IcebreakerMessagesRequest.create(invalidPayload)).toThrow(RuleValidationError)
  })
})
