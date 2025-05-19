import { Err, Ok } from 'ts-results'
import { SenderComment } from './definition'

describe('SenderComment', () => {
  const validPayload = {
    id: 1,
    commentedContent: 'This is a valid comment.',
    commentedInPublicationUrl: 'https://example.com/post',
    commentDate: '2023-01-01',
    authorUsername: 'validUser',
  }

  it('should create a SenderComment instance with valid payload', () => {
    const result = SenderComment.of(validPayload)
    expect(result).toBeInstanceOf(Ok)
    if (result.ok) {
      expect(result.val).toBeInstanceOf(SenderComment)
    }
  })

  it('should fail if id is less than 1', () => {
    const payload = { ...validPayload, id: 0 }
    const result = SenderComment.of(payload)
    expect(result).toBeInstanceOf(Err)
  })

  it('should fail if commentedContent exceeds 1500 characters', () => {
    const payload = { ...validPayload, commentedContent: 'a'.repeat(1501) }
    const result = SenderComment.of(payload)
    expect(result).toBeInstanceOf(Err)
  })

  it('should fail if commentedInPublicationUrl is invalid', () => {
    const payload = { ...validPayload, commentedInPublicationUrl: 'invalid-url' }
    const result = SenderComment.of(payload)
    expect(result).toBeInstanceOf(Err)
  })

  it('should fail if commentDate is not a valid string', () => {
    const payload = { ...validPayload, commentDate: 3434 }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = SenderComment.of(payload as any)
    expect(result).toBeInstanceOf(Err)
  })

  it('should fail if authorUsername is empty', () => {
    const payload = { ...validPayload, authorUsername: '' }
    const result = SenderComment.of(payload)
    expect(result).toBeInstanceOf(Err)
  })

  it('should fail if authorUsername exceeds 255 characters', () => {
    const payload = { ...validPayload, authorUsername: 'a'.repeat(256) }
    const result = SenderComment.of(payload)
    expect(result).toBeInstanceOf(Err)
  })
})
