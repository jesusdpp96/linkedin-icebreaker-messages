// profile.test.ts
import { Err, Ok } from 'ts-results'
import { Profile } from './definition'
import type { Payload } from './payload'

function createValidPayload(): Payload {
  return {
    id: 1,
    username: 'valid_user',
    firstName: 'John',
    lastName: 'Doe',
    profilePicture: 'https://example.com/image.jpg',
    headline: 'Software Engineer',
    summary: 'Experienced developer with a strong background in web technologies.',
    certifications: [
      {
        year: 2020,
        name: 'AWS Certified Developer',
        institution: 'Amazon',
      },
    ],
    lastPosition: {
      title: 'Frontend Developer',
      companyName: 'Tech Corp',
      startYear: 2022,
      startMonth: 1,
    },
  }
}

describe('Profile.of()', () => {
  it('should create a valid Profile instance with correct payload', () => {
    const payload = createValidPayload()
    const result = Profile.of(payload)
    expect(result).toBeInstanceOf(Ok)
  })

  it('should reject id less than 1', () => {
    const payload = { ...createValidPayload(), id: 0 }
    const result = Profile.of(payload)
    expect(result).toBeInstanceOf(Err)
  })

  it('should reject empty username', () => {
    const payload = { ...createValidPayload(), username: '' }
    const result = Profile.of(payload)
    expect(result).toBeInstanceOf(Err)
  })

  it('should reject username over 255 characters', () => {
    const payload = { ...createValidPayload(), username: 'a'.repeat(256) }
    const result = Profile.of(payload)
    expect(result).toBeInstanceOf(Err)
  })

  it('should reject profilePicture with invalid URL', () => {
    const payload = { ...createValidPayload(), profilePicture: 'not-a-url' }
    const result = Profile.of(payload)
    expect(result).toBeInstanceOf(Err)
  })

  it('should reject certification year before 1900', () => {
    const payload = {
      ...createValidPayload(),
      certifications: [{ year: 1899, name: 'Cert', institution: 'Inst' }],
    }
    const result = Profile.of(payload)
    expect(result).toBeInstanceOf(Err)
  })

  it('should reject certification year after current year', () => {
    const payload = {
      ...createValidPayload(),
      certifications: [
        {
          year: new Date().getFullYear() + 1,
          name: 'Cert',
          institution: 'Inst',
        },
      ],
    }
    const result = Profile.of(payload)
    expect(result).toBeInstanceOf(Err)
  })

  it('should reject lastPosition.startYear before 1900', () => {
    const payload = {
      ...createValidPayload(),
      lastPosition: {
        ...createValidPayload().lastPosition!,
        startYear: 1899,
      },
    }
    const result = Profile.of(payload)
    expect(result).toBeInstanceOf(Err)
  })

  it('should reject lastPosition.startMonth less than 0', () => {
    const payload = {
      ...createValidPayload(),
      lastPosition: {
        ...createValidPayload().lastPosition!,
        startMonth: -1,
      },
    }
    const result = Profile.of(payload)
    expect(result).toBeInstanceOf(Err)
  })

  it('should reject lastPosition.startMonth greater than 12', () => {
    const payload = {
      ...createValidPayload(),
      lastPosition: {
        ...createValidPayload().lastPosition!,
        startMonth: 13,
      },
    }
    const result = Profile.of(payload)
    expect(result).toBeInstanceOf(Err)
  })

  it('should accept null lastPosition', () => {
    const payload = {
      ...createValidPayload(),
      lastPosition: null,
    }
    const result = Profile.of(payload)
    expect(result).toBeInstanceOf(Ok)
  })
})
