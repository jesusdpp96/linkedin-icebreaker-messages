import { Err, Ok } from 'ts-results'
import { Post } from './definition'

describe('Post Entity', () => {
  const validPayload = {
    id: 1,
    postedContent: 'This is a valid post content.',
    publicationUrl: 'https://example.com',
    postedDate: '2023-01-01',
    authorUsername: 'validUser',
    hasMediaContent: true,
  }

  it('should create a Post instance with valid payload', () => {
    const result = Post.of(validPayload)
    expect(result).toBeInstanceOf(Ok)
    expect(result.unwrap()).toBeInstanceOf(Post)
  })

  it('should fail if id is less than 1', () => {
    const payload = { ...validPayload, id: 0 }
    const result = Post.of(payload)
    expect(result).toBeInstanceOf(Err)
  })

  it('should fail if postedContent exceeds 1500 characters', () => {
    const payload = { ...validPayload, postedContent: 'a'.repeat(1501) }
    const result = Post.of(payload)
    expect(result).toBeInstanceOf(Err)
  })

  it('should fail if publicationUrl is invalid', () => {
    const payload = { ...validPayload, publicationUrl: 'invalid-url' }
    const result = Post.of(payload)
    expect(result).toBeInstanceOf(Err)
  })

  it('should fail if postedDate is not a string', () => {
    const payload = { ...validPayload, postedDate: 12345 as unknown as string } // Explicit cast for testing
    const result = Post.of(payload)
    expect(result).toBeInstanceOf(Err)
  })

  it('should fail if authorUsername is empty', () => {
    const payload = { ...validPayload, authorUsername: '' }
    const result = Post.of(payload)
    expect(result).toBeInstanceOf(Err)
  })

  it('should fail if hasMediaContent is not a boolean', () => {
    const payload = { ...validPayload, hasMediaContent: 'true' as unknown as boolean } // Explicit cast for testing
    const result = Post.of(payload)
    expect(result).toBeInstanceOf(Err)
  })
})
