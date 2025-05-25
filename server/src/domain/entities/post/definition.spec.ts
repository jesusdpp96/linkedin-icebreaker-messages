import { expect, it, describe } from '@jest/globals'
import { Post } from './definition'
import { RuleValidationError } from '../../base'

describe('Post', () => {
  const validPayload = {
    id: 1,
    postedContent: 'This is a valid post content.',
    publicationUrl: 'https://example.com',
    postedDate: '2023-01-01',
    authorUsername: 'validUser',
    hasMediaContent: true,
  }

  it('should create a Post instance with valid payload', () => {
    const post = Post.create(validPayload)
    expect(post).toBeInstanceOf(Post)
    expect(post.toJSON()).toEqual(validPayload)
  })

  it('should throw RuleValidationError for invalid payload', () => {
    const invalidPayload = { ...validPayload, id: 0 } // id must be >= 1
    expect(() => Post.create(invalidPayload)).toThrow(RuleValidationError)
  })

  it('should adjust overlong postedContent to meet conditions', () => {
    const longContent = 'a'.repeat(2000) // exceeds max length of 1500
    const payload = { ...validPayload, postedContent: longContent }
    const post = Post.create(payload)
    expect(post.postedContent.length).toBeLessThanOrEqual(1500)
  })

  it('should adjust overlong authorUsername to meet conditions', () => {
    const longUsername = 'a'.repeat(300) // exceeds max length of 255
    const payload = { ...validPayload, authorUsername: longUsername }
    const post = Post.create(payload)
    expect(post.authorUsername.length).toBeLessThanOrEqual(255)
  })

  it('should validate publicationUrl format', () => {
    const invalidUrlPayload = { ...validPayload, publicationUrl: 'invalid-url' }
    expect(() => Post.create(invalidUrlPayload)).toThrow(RuleValidationError)
  })

  it('should validate hasMediaContent as a boolean', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const invalidMediaPayload = { ...validPayload, hasMediaContent: 'not-a-boolean' as any }
    expect(() => Post.create(invalidMediaPayload)).toThrow(RuleValidationError)
  })
})
