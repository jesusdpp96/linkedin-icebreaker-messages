import { describe, it, expect } from '@jest/globals'
import { IcebreakerMessage } from './definition'
import { RuleValidationError } from '../../base'

describe('IcebreakerMessage', () => {
  const validPayload = {
    message: 'A'.repeat(100),
    templateTitle: 'Valid Title',
    templateCategory: 'Valid Category',
    instruction: 'A'.repeat(100),
    sourcePosts: ['post1', 'post2'],
    receiverName: 'Receiver',
    receiverProfilePicture: 'https://example.com/receiver.jpg',
    receiverHeadline: 'Receiver Headline',
    senderName: 'Sender',
    senderProfilePicture: 'https://example.com/sender.jpg',
    senderHeadline: 'Sender Headline',
  }

  it('should create an instance with valid payload', () => {
    const instance = IcebreakerMessage.create(validPayload)
    expect(instance).toBeInstanceOf(IcebreakerMessage)
    expect(instance.message).toBe(validPayload.message)
  })

  it('should throw an error for message exceeding max length', () => {
    const payload = { ...validPayload, message: 'A'.repeat(600) }
    expect(() => IcebreakerMessage.create(payload)).toThrow(RuleValidationError)
  })

  it('should throw an error for message below min length', () => {
    const payload = { ...validPayload, message: 'Short' }
    expect(() => IcebreakerMessage.create(payload)).toThrow(RuleValidationError)
  })

  it('should crop instruction exceeding max length', () => {
    const payload = { ...validPayload, instruction: 'A'.repeat(600) }
    const instance = IcebreakerMessage.create(payload)
    expect(instance.instruction.length).toBe(500)
  })

  it('should throw an error for invalid URL in receiverProfilePicture', () => {
    const payload = { ...validPayload, receiverProfilePicture: 'invalid-url' }
    expect(() => IcebreakerMessage.create(payload)).toThrow(RuleValidationError)
  })

  it('should crop receiverName exceeding max length', () => {
    const payload = { ...validPayload, receiverName: 'A'.repeat(200) }
    const instance = IcebreakerMessage.create(payload)
    expect(instance.receiverName.length).toBe(100)
  })

  it('should crop senderName exceeding max length', () => {
    const payload = { ...validPayload, senderName: 'A'.repeat(200) }
    const instance = IcebreakerMessage.create(payload)
    expect(instance.senderName.length).toBe(100)
  })

  it('should crop receiverHeadline exceeding max length', () => {
    const payload = { ...validPayload, receiverHeadline: 'A'.repeat(300) }
    const instance = IcebreakerMessage.create(payload)
    expect(instance.receiverHeadline.length).toBe(200)
  })

  it('should crop senderHeadline exceeding max length', () => {
    const payload = { ...validPayload, senderHeadline: 'A'.repeat(300) }
    const instance = IcebreakerMessage.create(payload)
    expect(instance.senderHeadline.length).toBe(200)
  })

  it('should throw an error for templateTitle below min length', () => {
    const payload = { ...validPayload, templateTitle: '' }
    expect(() => IcebreakerMessage.create(payload)).toThrow(RuleValidationError)
  })

  it('should throw an error for templateCategory below min length', () => {
    const payload = { ...validPayload, templateCategory: '' }
    expect(() => IcebreakerMessage.create(payload)).toThrow(RuleValidationError)
  })

  it('should throw an error for receiverName below min length', () => {
    const payload = { ...validPayload, receiverName: '' }
    expect(() => IcebreakerMessage.create(payload)).toThrow(RuleValidationError)
  })

  it('should throw an error for senderName below min length', () => {
    const payload = { ...validPayload, senderName: '' }
    expect(() => IcebreakerMessage.create(payload)).toThrow(RuleValidationError)
  })

  it('should throw an error for instruction below min length', () => {
    const payload = { ...validPayload, instruction: '' }
    expect(() => IcebreakerMessage.create(payload)).toThrow(RuleValidationError)
  })
})
