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

  it('should correctly set senderUsername and receiverUsername', () => {
    const instance = IcebreakerMessagesRequest.create(validPayload)
    expect(instance.senderUsername).toBe('sender')
    expect(instance.receiverUsername).toBe('receiver')
    const otherPayload = {
      ...validPayload,
      senderLinkedinUrl:
        'https://linkedin.com/in/jes%C3%BAs-david-p%C3%A9rez-p%C3%A9rez-2b654b239',
      receiverLinkedinUrl: 'https://linkedin.com/in/another-receiver',
    }
    const otherInstance = IcebreakerMessagesRequest.create(otherPayload)
    expect(otherInstance.senderUsername).toBe('jesús-david-pérez-pérez-2b654b239')
    expect(otherInstance.receiverUsername).toBe('another-receiver')
  })
})

describe('IcebreakerMessagesRequest.create() - LinkedIn URL validation', () => {
  const validPayload = {
    senderLinkedinUrl: 'https://linkedin.com/in/sender',
    problemDescription: 'This is a valid problem description.',
    solutionDescription: 'This is a valid solution description.',
    receiverLinkedinUrl: 'https://linkedin.com/in/receiver',
  }

  it('should match valid LinkedIn profile URLs', () => {
    const validUrls = [
      'https://www.linkedin.com/in/johndoe/',
      'https://www.linkedin.com/in/john-doe/',
      'https://linkedin.com/in/jane-doe-12345',
      'https://www.linkedin.com/in/jes%C3%BAs-david-p%C3%A9rez-p%C3%A9rez-2b654b239/',
    ]

    validUrls.forEach(url => {
      const payload = { ...validPayload, senderLinkedinUrl: url }
      expect(() => IcebreakerMessagesRequest.create(payload)).not.toThrow()
    })
  })

  it('should match valid LinkedIn profile URLs with child paths or query parameters', () => {
    const validUrlsWithPaths = [
      'https://www.linkedin.com/in/johndoe/recent-activity/',
      'https://www.linkedin.com/in/john-doe-12345/recent-activity/comments/',
      'https://linkedin.com/in/jane-doe-12345?trk=public_profile',
      'https://www.linkedin.com/in/jes%C3%BAs-david-p%C3%A9rez-p%C3%A9rez-2b654b239/recent-activity/comments/',
    ]

    validUrlsWithPaths.forEach(url => {
      const payload = { ...validPayload, senderLinkedinUrl: url }
      expect(() => IcebreakerMessagesRequest.create(payload)).not.toThrow()
    })
  })

  it('should not match invalid LinkedIn URLs', () => {
    const invalidUrls = [
      'https://www.linkedin.com/company/microsoft/',
      'https://linkedin.com/company/google',
      'https://www.linkedin.com/',
      'https://linkedin.com/in/',
    ]

    invalidUrls.forEach(url => {
      const payload = { ...validPayload, senderLinkedinUrl: url }
      expect(() => IcebreakerMessagesRequest.create(payload)).toThrow(RuleValidationError)
    })
  })
})

describe('IcebreakerMessagesRequest.create() - URL adjustment', () => {
  const validPayload = {
    senderLinkedinUrl: 'https://linkedin.com/in/sender',
    problemDescription: 'This is a valid problem description.',
    solutionDescription: 'This is a valid solution description.',
    receiverLinkedinUrl: 'https://linkedin.com/in/receiver',
  }

  it('should adjust senderLinkedinUrl by removing child paths or query parameters', () => {
    const payload = {
      ...validPayload,
      senderLinkedinUrl:
        'https://linkedin.com/in/sender/recent-activity/comments?trk=public_profile',
    }
    const instance = IcebreakerMessagesRequest.create(payload)
    expect(instance.senderLinkedinUrl).toBe('https://linkedin.com/in/sender/')
  })

  it('should adjust receiverLinkedinUrl by removing child paths or query parameters', () => {
    const payload = {
      ...validPayload,
      receiverLinkedinUrl:
        'https://linkedin.com/in/receiver/recent-activity/comments?trk=public_profile',
    }
    const instance = IcebreakerMessagesRequest.create(payload)
    expect(instance.receiverLinkedinUrl).toBe('https://linkedin.com/in/receiver/')
  })
})
