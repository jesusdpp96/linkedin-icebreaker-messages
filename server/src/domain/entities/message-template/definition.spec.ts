import { Err, Ok } from 'ts-results'
import { MessageTemplate } from './definition'

describe('MessageTemplate', () => {
  describe('of', () => {
    it('should create a MessageTemplate instance for valid payload', () => {
      const validPayload = {
        id: 1,
        title: 'Sample Title',
        category: 'Sample Category',
        instruction: 'Sample Instruction',
        example: 'Sample Example',
      }

      const result = MessageTemplate.of(validPayload)

      expect(result).toBeInstanceOf(Ok)
      if (result.ok) {
        const template = result.val
        expect(template.id).toBe(validPayload.id)
        expect(template.title).toBe(validPayload.title)
        expect(template.category).toBe(validPayload.category)
        expect(template.instruction).toBe(validPayload.instruction)
        expect(template.example).toBe(validPayload.example)
      }
    })

    it('should return an error for invalid payload', () => {
      const invalidPayload = {
        id: -1, // Invalid id
        title: 'Sample Title',
        category: 'Sample Category',
        instruction: 'Sample Instruction',
        example: 'Sample Example',
      }

      const result = MessageTemplate.of(invalidPayload)

      expect(result).toBeInstanceOf(Err)
      if (!result.ok) {
        const error = result.val
        expect(error.message).toContain('MessageTemplate')
        expect(error.message).toContain('id')
      }
    })
  })
})
