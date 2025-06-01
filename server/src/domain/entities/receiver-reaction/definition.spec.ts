import { expect, it, describe } from '@jest/globals'
import { ReceiverReaction } from './definition'
import { RuleValidationError } from '../../base'

describe('ReceiverReaction', () => {
  describe('create', () => {
    it('should create a valid ReceiverReaction instance', () => {
      const validPayload = {
        id: 1,
        reactedToContent: 'This is a valid content',
        reaction: 'Like',
        reactionByUsername: 'user123',
      }

      const instance = ReceiverReaction.create(validPayload)

      expect(instance).toBeInstanceOf(ReceiverReaction)
      expect(instance.toJSON()).toEqual(validPayload)
    })

    it('should throw RuleValidationError for invalid payload', () => {
      const invalidPayload = {
        id: 0, // Invalid ID
        reactedToContent: 'Valid content',
        reaction: 'Like',
        reactionByUsername: 'user123',
      }

      expect(() => ReceiverReaction.create(invalidPayload)).toThrow(RuleValidationError)
    })

    it('should adjust payload values before validation', () => {
      const longContent = 'a'.repeat(2000) // Exceeds max length
      const longReaction = 'b'.repeat(300) // Exceeds max length
      const longUsername = 'c'.repeat(300) // Exceeds max length

      const payload = {
        id: 1,
        reactedToContent: longContent,
        reaction: longReaction,
        reactionByUsername: longUsername,
      }

      const instance = ReceiverReaction.create(payload)

      expect(instance.reactedToContent).toHaveLength(1500) // Adjusted to max length
      expect(instance.reaction).toHaveLength(255) // Adjusted to max length
      expect(instance.reactionByUsername).toHaveLength(255) // Adjusted to max length
    })
  })
})
