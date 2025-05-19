import { Err, Ok } from 'ts-results'
import { ReceiverReaction } from './definition'

describe('ReceiverReaction', () => {
  it('should create a valid ReceiverReaction instance', () => {
    const payload = {
      id: 1,
      reactedToContent: 'This is a valid content.',
      reaction: 'Like',
      reactionByUsername: 'validUser',
    }

    const result = ReceiverReaction.of(payload)

    expect(result).toBeInstanceOf(Ok)
    if (result.ok) {
      const instance = result.val
      expect(instance.id).toBe(payload.id)
      expect(instance.reactedToContent).toBe(payload.reactedToContent)
      expect(instance.reaction).toBe(payload.reaction)
      expect(instance.reactionByUsername).toBe(payload.reactionByUsername)
    }
  })

  it('should fail if id is less than 1', () => {
    const payload = {
      id: 0,
      reactedToContent: 'Valid content.',
      reaction: 'Like',
      reactionByUsername: 'validUser',
    }

    const result = ReceiverReaction.of(payload)

    expect(result).toBeInstanceOf(Err)
    if (result.err) {
      expect(result.val.message).toContain('id')
    }
  })

  it('should fail if reactedToContent exceeds 1500 characters', () => {
    const payload = {
      id: 1,
      reactedToContent: 'a'.repeat(1501),
      reaction: 'Like',
      reactionByUsername: 'validUser',
    }

    const result = ReceiverReaction.of(payload)

    expect(result).toBeInstanceOf(Err)
    if (result.err) {
      expect(result.val.message).toContain('reactedToContent')
    }
  })

  it('should fail if reaction exceeds 255 characters', () => {
    const payload = {
      id: 1,
      reactedToContent: 'Valid content.',
      reaction: 'a'.repeat(256),
      reactionByUsername: 'validUser',
    }

    const result = ReceiverReaction.of(payload)

    expect(result).toBeInstanceOf(Err)
    if (result.err) {
      expect(result.val.message).toContain('reaction')
    }
  })

  it('should fail if reactionByUsername is empty', () => {
    const payload = {
      id: 1,
      reactedToContent: 'Valid content.',
      reaction: 'Like',
      reactionByUsername: '',
    }

    const result = ReceiverReaction.of(payload)

    expect(result).toBeInstanceOf(Err)
    if (result.err) {
      expect(result.val.message).toContain('reactionByUsername')
    }
  })

  it('should fail if reactionByUsername exceeds 255 characters', () => {
    const payload = {
      id: 1,
      reactedToContent: 'Valid content.',
      reaction: 'Like',
      reactionByUsername: 'a'.repeat(256),
    }

    const result = ReceiverReaction.of(payload)

    expect(result).toBeInstanceOf(Err)
    if (result.err) {
      expect(result.val.message).toContain('reactionByUsername')
    }
  })
})
