import { expect, it, describe } from '@jest/globals'
import { Profile } from './definition'
import { RuleValidationError } from '../../base'
import { type Payload } from './payload'

describe('Profile Entity', () => {
  const validPayload: Payload = {
    id: 1,
    username: 'validUsername',
    firstName: 'John',
    lastName: 'Doe',
    profilePicture: 'https://example.com/profile.jpg',
    headline: 'Software Engineer',
    summary: 'Experienced software engineer specializing in TypeScript.',
    certifications: [{ year: 2020, name: 'AWS Certified', institution: 'Amazon' }],
    lastPosition: {
      title: 'Developer',
      companyName: 'TechCorp',
      startYear: 2018,
      startMonth: 5,
    },
  }

  it('should create a Profile instance with valid payload', () => {
    const profile = Profile.create(validPayload)
    expect(profile).toBeInstanceOf(Profile)
    expect(profile.toJSON()).toEqual(validPayload)
  })

  it('should adjust payload values when creating a Profile', () => {
    const adjustedPayload = {
      ...validPayload,
      firstName: 'A'.repeat(300), // Exceeds max length
      lastName: 'B'.repeat(300), // Exceeds max length
      profilePicture: '   https://example.com/profile.jpg   ', // Extra spaces
      headline: 'C'.repeat(300), // Exceeds max length
      summary: 'D'.repeat(2000), // Exceeds max length
      certifications: [
        {
          year: 2020,
          name: 'E'.repeat(200), // Exceeds max length
          institution: 'F'.repeat(200), // Exceeds max length
        },
      ],
      lastPosition: {
        title: 'G'.repeat(200), // Exceeds max length
        companyName: 'H'.repeat(200), // Exceeds max length
        startYear: 2018,
        startMonth: 5,
      },
    }

    const profile = Profile.create(adjustedPayload)
    expect(profile.firstName).toHaveLength(255)
    expect(profile.lastName).toHaveLength(255)
    expect(profile.profilePicture).toBe('https://example.com/profile.jpg')
    expect(profile.headline).toHaveLength(255)
    expect(profile.summary).toHaveLength(1500)
    expect(profile.certifications[0].name).toHaveLength(100)
    expect(profile.certifications[0].institution).toHaveLength(100)
    expect(profile.lastPosition?.title).toHaveLength(100)
    expect(profile.lastPosition?.companyName).toHaveLength(100)
  })

  it('should throw RuleValidationError for invalid payload', () => {
    const invalidPayload = {
      ...validPayload,
      id: -1, // Invalid ID
    }

    expect(() => Profile.create(invalidPayload)).toThrow(RuleValidationError)
  })

  it('should allow null for lastPosition', () => {
    const payloadWithNullLastPosition = {
      ...validPayload,
      lastPosition: null,
    }

    const profile = Profile.create(payloadWithNullLastPosition)
    expect(profile.lastPosition).toBeNull()
  })
})
