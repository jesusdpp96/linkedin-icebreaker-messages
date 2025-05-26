import { describe, it, expect, beforeEach } from '@jest/globals'
import { PromptBuilder } from './definition'
import { Profile } from '../profile/definition'
import { Post } from '../post/definition'
import { SenderComment } from '../sender-comment/definition'
import { ReceiverReaction } from '../receiver-reaction/definition'
import { MessageTemplate } from '../message-template'
import { OneShotStrategy } from './strategy/one-shot-strategy'
import { ManyShotStrategy } from './strategy/many-shots-strategy'
import type { Payload } from './payload'

describe('PromptBuilder', () => {
  let validPayload: Payload

  beforeEach(() => {
    validPayload = {
      senderProfile: Profile.create({
        id: 1,
        username: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        profilePicture: 'https://example.com/john.jpg',
        headline: 'Software Engineer',
        summary: 'Experienced software engineer specializing in TypeScript.',
        certifications: [{ year: 2020, name: 'AWS Certified', institution: 'Amazon' }],
        lastPosition: {
          title: 'Developer',
          companyName: 'TechCorp',
          startYear: 2018,
          startMonth: 5,
        },
      }),
      receiverProfile: Profile.create({
        id: 2,
        username: 'jane_smith',
        firstName: 'Jane',
        lastName: 'Smith',
        profilePicture: 'https://example.com/jane.jpg',
        headline: 'Product Manager',
        summary: 'Product manager with a passion for innovation.',
        certifications: [{ year: 2019, name: 'PMP', institution: 'PMI' }],
        lastPosition: {
          title: 'Manager',
          companyName: 'InnovateCorp',
          startYear: 2017,
          startMonth: 3,
        },
      }),
      senderPosts: [
        Post.create({
          id: 1,
          postedContent: 'Post content',
          publicationUrl: 'https://example.com',
          postedDate: '2023-01-01',
          authorUsername: 'john_doe',
          hasMediaContent: false,
        }),
      ],
      receiverPosts: [
        Post.create({
          id: 2,
          postedContent: 'Receiver post content',
          publicationUrl: 'https://example.com/receiver',
          postedDate: '2023-01-03',
          authorUsername: 'jane_smith',
          hasMediaContent: true,
        }),
      ],
      senderComments: [
        SenderComment.create({
          id: 1,
          commentedContent: 'Comment content',
          commentedInPublicationUrl: 'https://example.com',
          commentDate: '2023-01-02',
          authorUsername: 'john_doe',
        }),
      ],
      receiverReactions: [
        ReceiverReaction.create({
          id: 1,
          reactedToContent: 'Reacted content',
          reaction: 'Like',
          reactionByUsername: 'jane_smith',
        }),
      ],
      problemDescription: 'Problem description',
      solutionDescription: 'Solution description',
      messagesTemplates: [
        MessageTemplate.create({
          id: 1,
          title: 'Test Title',
          category: 'Test Category',
          instruction: 'Test Instruction',
          example: 'This is a valid example message.',
        }),
      ],
    }
  })

  it('should create a valid PromptBuilder instance', () => {
    const builder = PromptBuilder.create(validPayload)
    expect(builder).toBeInstanceOf(PromptBuilder)
  })

  it('should throw an error if senderProfile is invalid', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validPayload.senderProfile = null as any
    expect(() => PromptBuilder.create(validPayload)).toThrow()
  })

  it('should generate prompts using OneShotStrategy when content is insufficient', () => {
    validPayload.senderPosts = []
    validPayload.senderComments = []
    const builder = PromptBuilder.create(validPayload)
    const prompts = builder.generatePrompts(3, new OneShotStrategy(builder))
    expect(prompts).toHaveLength(1)
  })

  it('should generate prompts using ManyShotStrategy when content is sufficient', () => {
    const builder = PromptBuilder.create(validPayload)
    const prompts = builder.generatePrompts(2, new ManyShotStrategy(builder, 2))
    expect(prompts).toHaveLength(2)
  })

  it('should correctly serialize to JSON', () => {
    const builder = PromptBuilder.create(validPayload)
    const json = builder.toJSON()
    expect(json).toHaveProperty('senderProfile')
    expect(json).toHaveProperty('receiverProfile')
    expect(json.senderPosts).toHaveLength(1)
  })
})
