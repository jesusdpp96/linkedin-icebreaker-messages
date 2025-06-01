import { describe, it, beforeEach, expect } from '@jest/globals'
import { ManyShotStrategy } from './many-shots-strategy'
import { Post } from '../../post/definition'
import { SenderComment } from '../../sender-comment/definition'
import { ReceiverReaction } from '../../receiver-reaction/definition'
import { Profile } from '../../profile/definition'
import { PromptBuilder } from '../definition'
import { MessageTemplate } from '../../message-template'

describe('ManyShotStrategy', () => {
  let mockBuilder: PromptBuilder
  let strategy: ManyShotStrategy

  beforeEach(() => {
    const senderProfile = Profile.create({
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
    })

    const receiverProfile = Profile.create({
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
    })

    const senderPosts = [
      Post.create({
        id: 1,
        postedContent: 'Post content',
        publicationUrl: 'https://example.com',
        postedDate: '2023-01-01',
        authorUsername: 'john_doe',
        hasMediaContent: false,
      }),
      Post.create({
        id: 2,
        postedContent: 'Another post content',
        publicationUrl: 'https://example.com/another',
        postedDate: '2023-01-02',
        authorUsername: 'john_doe',
        hasMediaContent: true,
      }),
    ]

    const senderComments = [
      SenderComment.create({
        id: 1,
        commentedContent: 'Comment content',
        commentedInPublicationUrl: 'https://example.com',
        commentDate: '2023-01-02',
        authorUsername: 'john_doe',
      }),
    ]

    const receiverReactions = [
      ReceiverReaction.create({
        id: 1,
        reactedToContent: 'Reacted content',
        reaction: 'Like',
        reactionByUsername: 'jane_smith',
      }),
    ]
    const receiverPosts = [
      Post.create({
        id: 2,
        postedContent: 'Receiver post content',
        publicationUrl: 'https://example.com/receiver',
        postedDate: '2023-01-03',
        authorUsername: 'jane_smith',
        hasMediaContent: true,
      }),
    ]
    const messagesTemplates = [
      MessageTemplate.create({
        id: 1,
        title: 'Test Title',
        category: 'Test Category',
        instruction: 'Test Instruction',
        example: 'This is a valid example message.',
      }),
    ]
    mockBuilder = PromptBuilder.create({
      senderProfile,
      receiverProfile,
      problemDescription: 'Problem description',
      solutionDescription: 'Solution description',
      senderPosts,
      senderComments,
      receiverPosts,
      receiverReactions,
      messagesTemplates,
    })

    strategy = new ManyShotStrategy(mockBuilder, 2)
  })

  it('should generate the correct number of prompts', () => {
    /**
     * ManyShotStrategy generates prompts based on the number of messages requested
     * it means that if we request 2 messages, it should generate 2 prompts
     */
    const prompts = mockBuilder.generatePrompts(2, strategy)
    expect(prompts).toHaveLength(2)
  })

  it('should include the correct prompt structure', () => {
    const prompts = strategy.generatePrompts(1)
    expect(prompts[0]).toHaveProperty('prompt')
    expect(prompts[0]).toHaveProperty('attachments')
    expect(prompts[0]).toHaveProperty('responseJsonSchema')
  })

  it('should create prompts with the correct JSON schema', () => {
    const prompts = strategy.generatePrompts(1)
    const jsonSchemaAttachment = prompts[0].responseJsonSchema.includes('json-schema')
    expect(jsonSchemaAttachment).toBeDefined()
  })
})
