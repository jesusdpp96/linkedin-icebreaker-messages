import { expect, it, describe } from '@jest/globals'
import { SenderComment } from './definition'
import { RuleValidationError } from '../../base'
describe('SenderComment', () => {
  const validPayload = {
    id: 1,
    commentedContent: 'This is a valid comment.',
    commentedInPublicationUrl: 'https://example.com/publication',
    commentDate: '2023-10-01',
    authorUsername: 'validUser',
  }

  it('should create a SenderComment instance with valid payload', () => {
    const instance = SenderComment.create(validPayload)
    expect(instance).toBeInstanceOf(SenderComment)
    expect(instance.toJSON()).toEqual(validPayload)
  })

  it('should throw RuleValidationError for invalid payload', () => {
    const invalidPayload = { ...validPayload, id: 0 } // Invalid ID
    expect(() => SenderComment.create(invalidPayload)).toThrow(RuleValidationError)
  })

  it('should apply adjustments to the payload before validation', () => {
    const adjustedPayload = {
      ...validPayload,
      commentedContent: 'A'.repeat(2000), // Exceeds max length
      authorUsername: 'A'.repeat(300), // Exceeds max length
    }
    const instance = SenderComment.create(adjustedPayload)
    expect(instance.commentedContent).toHaveLength(1500) // Adjusted to max length
    expect(instance.authorUsername).toHaveLength(255) // Adjusted to max length
  })

  it('should validate URL format for commentedInPublicationUrl', () => {
    const invalidUrlPayload = { ...validPayload, commentedInPublicationUrl: 'invalid-url' }
    expect(() => SenderComment.create(invalidUrlPayload)).toThrow(RuleValidationError)
  })

  it('should validate non-empty authorUsername', () => {
    const emptyUsernamePayload = { ...validPayload, authorUsername: '' }
    expect(() => SenderComment.create(emptyUsernamePayload)).toThrow(RuleValidationError)
  })
})
