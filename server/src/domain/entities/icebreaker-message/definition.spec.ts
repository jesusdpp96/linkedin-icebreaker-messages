import { Err, Ok } from 'ts-results'
import { IcebreakerMessage } from './definition'
import type { Payload } from './payload'

function createValidPayload(): Payload {
  return {
    message: 'Hello, this is an icebreaker message.',
    templateTitle: 'Friendly Greeting',
    templateCategory: 'Networking',
    instruction: 'Use this message to start a conversation.',
    sourcePosts: ['https://example.com/post1', 'https://example.com/post2'],
    receiverName: 'Jane Doe',
    receiverProfilePicture: 'https://example.com/receiver.jpg',
    receiverHeadline: 'Product Manager at Tech Corp',
    senderName: 'John Smith',
    senderProfilePicture: 'https://example.com/sender.jpg',
    senderHeadline: 'Software Engineer at Dev Inc',
  }
}

describe('IcebreakerMessage.of()', () => {
  it('should create a valid IcebreakerMessage instance with correct payload', () => {
    const payload = createValidPayload()
    const result = IcebreakerMessage.of(payload)
    expect(result).toBeInstanceOf(Ok)
  })

  it('should accept empty message', () => {
    const payload = { ...createValidPayload(), message: '' }
    const result = IcebreakerMessage.of(payload)
    expect(result).toBeInstanceOf(Ok)
  })

  it('should accept empty templateTitle', () => {
    const payload = { ...createValidPayload(), templateTitle: '' }
    const result = IcebreakerMessage.of(payload)
    expect(result).toBeInstanceOf(Ok)
  })

  it('should accept empty templateCategory', () => {
    const payload = { ...createValidPayload(), templateCategory: '' }
    const result = IcebreakerMessage.of(payload)
    expect(result).toBeInstanceOf(Ok)
  })

  it('should accept empty instruction', () => {
    const payload = { ...createValidPayload(), instruction: '' }
    const result = IcebreakerMessage.of(payload)
    expect(result).toBeInstanceOf(Ok)
  })

  it('should accept sourcePosts with invalid URLs', () => {
    const payload = { ...createValidPayload(), sourcePosts: ['not-a-url'] }
    const result = IcebreakerMessage.of(payload)
    expect(result).toBeInstanceOf(Ok)
  })

  it('should accept empty receiverName', () => {
    const payload = { ...createValidPayload(), receiverName: '' }
    const result = IcebreakerMessage.of(payload)
    expect(result).toBeInstanceOf(Ok)
  })

  it('should accept receiverProfilePicture with invalid URL', () => {
    const payload = { ...createValidPayload(), receiverProfilePicture: 'not-a-url' }
    const result = IcebreakerMessage.of(payload)
    expect(result).toBeInstanceOf(Ok)
  })

  it('should accept empty senderName', () => {
    const payload = { ...createValidPayload(), senderName: '' }
    const result = IcebreakerMessage.of(payload)
    expect(result).toBeInstanceOf(Ok)
  })

  it('should accept senderProfilePicture with invalid URL', () => {
    const payload = { ...createValidPayload(), senderProfilePicture: 'not-a-url' }
    const result = IcebreakerMessage.of(payload)
    expect(result).toBeInstanceOf(Ok)
  })
})
