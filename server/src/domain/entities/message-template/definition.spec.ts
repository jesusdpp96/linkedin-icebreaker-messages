import { describe, it, expect } from '@jest/globals'
import { MessageTemplate } from './definition'
import { RuleValidationError } from '../../base'

describe('MessageTemplate', () => {
  const validPayload = {
    id: 1,
    title: 'Test Title',
    category: 'Test Category',
    instruction: 'Test Instruction',
    example: 'This is a valid example message.',
  }

  it('should create a MessageTemplate instance with valid payload', () => {
    const template = MessageTemplate.create(validPayload)
    expect(template).toBeInstanceOf(MessageTemplate)
    expect(template.toJSON()).toEqual(validPayload)
  })

  it('should throw RuleValidationError for invalid id', () => {
    const invalidPayload = { ...validPayload, id: 0 }
    expect(() => MessageTemplate.create(invalidPayload)).toThrow(RuleValidationError)
  })

  it('should throw RuleValidationError for empty title', () => {
    const invalidPayload = { ...validPayload, title: '' }
    expect(() => MessageTemplate.create(invalidPayload)).toThrow(RuleValidationError)
  })

  it('should throw RuleValidationError for empty category', () => {
    const invalidPayload = { ...validPayload, category: '' }
    expect(() => MessageTemplate.create(invalidPayload)).toThrow(RuleValidationError)
  })

  it('should throw RuleValidationError for empty instruction', () => {
    const invalidPayload = { ...validPayload, instruction: '' }
    expect(() => MessageTemplate.create(invalidPayload)).toThrow(RuleValidationError)
  })

  it('should throw RuleValidationError for example exceeding 300 characters', () => {
    const longExample = 'a'.repeat(301)
    const invalidPayload = { ...validPayload, example: longExample }
    expect(() => MessageTemplate.create(invalidPayload)).toThrow(RuleValidationError)
  })

  it('should throw RuleValidationError for empty example', () => {
    const invalidPayload = { ...validPayload, example: '' }
    expect(() => MessageTemplate.create(invalidPayload)).toThrow(RuleValidationError)
  })
})
