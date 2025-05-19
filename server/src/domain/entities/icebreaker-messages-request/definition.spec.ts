import { Err, Ok } from 'ts-results'
import { IcebreakerMessagesRequest } from './definition'

describe('IcebreakerMessagesRequest', () => {
  const validPayload = {
    senderLinkedinUrl: 'https://linkedin.com/in/sender',
    problemDescription: 'This is a valid problem description.',
    solutionDescription: 'This is a valid solution description.',
    receiverLinkedinUrl: 'https://linkedin.com/in/receiver',
  }

  it('should create an instance with valid payload', () => {
    const result = IcebreakerMessagesRequest.of(validPayload)
    expect(result).toBeInstanceOf(Ok)
    if (result.ok) {
      const instance = result.val
      expect(instance.senderLinkedinUrl).toBe(validPayload.senderLinkedinUrl)
      expect(instance.problemDescription).toBe(validPayload.problemDescription)
      expect(instance.solutionDescription).toBe(validPayload.solutionDescription)
      expect(instance.receiverLinkedinUrl).toBe(validPayload.receiverLinkedinUrl)
    }
  })

  it('should return an error for invalid senderLinkedinUrl', () => {
    const invalidPayload = { ...validPayload, senderLinkedinUrl: 'invalid-url' }
    const result = IcebreakerMessagesRequest.of(invalidPayload)
    expect(result).toBeInstanceOf(Err)
    if (!result.ok) {
      const error = JSON.parse(result.val.message)
      expect(error.domain).toBe('IcebreakerMessagesRequest')
      expect(error.error.issues[0].message).toBe('sender-invalid-url')
    }
  })

  it('should return an error for excessively long problemDescription', () => {
    const invalidPayload = { ...validPayload, problemDescription: 'a'.repeat(1501) }
    const result = IcebreakerMessagesRequest.of(invalidPayload)
    expect(result).toBeInstanceOf(Err)
    if (!result.ok) {
      const error = JSON.parse(result.val.message)
      expect(error.domain).toBe('IcebreakerMessagesRequest')
      expect(error.error.issues[0].message).toContain(
        'String must contain at most 1500 character(s)',
      )
    }
  })

  it('should return an error for empty problemDescription', () => {
    const invalidPayload = { ...validPayload, problemDescription: '' }
    const result = IcebreakerMessagesRequest.of(invalidPayload)
    expect(result).toBeInstanceOf(Err)
    if (!result.ok) {
      const error = JSON.parse(result.val.message)
      expect(error.domain).toBe('IcebreakerMessagesRequest')
      expect(error.error.issues[0].message).toContain(
        'String must contain at least 1 character(s)',
      )
    }
  })

  it('should return an error for excessively long solutionDescription', () => {
    const invalidPayload = { ...validPayload, solutionDescription: 'a'.repeat(1501) }
    const result = IcebreakerMessagesRequest.of(invalidPayload)
    expect(result).toBeInstanceOf(Err)
    if (!result.ok) {
      const error = JSON.parse(result.val.message)
      expect(error.domain).toBe('IcebreakerMessagesRequest')
      expect(error.error.issues[0].message).toContain(
        'String must contain at most 1500 character(s)',
      )
    }
  })

  it('should return an error for empty solutionDescription', () => {
    const invalidPayload = { ...validPayload, solutionDescription: '' }
    const result = IcebreakerMessagesRequest.of(invalidPayload)
    expect(result).toBeInstanceOf(Err)
    if (!result.ok) {
      const error = JSON.parse(result.val.message)
      expect(error.domain).toBe('IcebreakerMessagesRequest')
      expect(error.error.issues[0].message).toContain(
        'String must contain at least 1 character(s)',
      )
    }
  })

  it('should return an error for invalid receiverLinkedinUrl', () => {
    const invalidPayload = { ...validPayload, receiverLinkedinUrl: 'ftp://invalid-url' }
    const result = IcebreakerMessagesRequest.of(invalidPayload)
    expect(result).toBeInstanceOf(Err)
    if (!result.ok) {
      const error = JSON.parse(result.val.message)
      expect(error.domain).toBe('IcebreakerMessagesRequest')
      expect(error.error.issues[0].message).toBe('receiver-invalid-url')
    }
  })

  it('should allow problemDescription with exactly 1500 characters', () => {
    const validPayloadWithEdgeCase = { ...validPayload, problemDescription: 'a'.repeat(1500) }
    const result = IcebreakerMessagesRequest.of(validPayloadWithEdgeCase)
    expect(result).toBeInstanceOf(Ok)
    if (result.ok) {
      const instance = result.val
      expect(instance.problemDescription).toBe(validPayloadWithEdgeCase.problemDescription)
    }
  })

  it('should allow solutionDescription with exactly 1500 characters', () => {
    const validPayloadWithEdgeCase = { ...validPayload, solutionDescription: 'a'.repeat(1500) }
    const result = IcebreakerMessagesRequest.of(validPayloadWithEdgeCase)
    expect(result).toBeInstanceOf(Ok)
    if (result.ok) {
      const instance = result.val
      expect(instance.solutionDescription).toBe(validPayloadWithEdgeCase.solutionDescription)
    }
  })
})
