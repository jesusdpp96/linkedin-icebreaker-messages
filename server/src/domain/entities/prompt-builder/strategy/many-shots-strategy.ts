import type { Post, PostPayload } from '../../post'
import type { SenderComment, SenderCommentPayload } from '../../sender-comment'
import type { ReceiverReactionPayload } from '../../receiver-reaction'
import type { PromptBuilder } from '../definition'
import { prompt1 } from '../prompts/prompt1'
import type { PromptShot, PromptStrategy } from './prompt-strategy'
import { getJsonSchemaResponse } from './json-schema-response'

/**
 * ManyShotStrategy generates prompts based on the number of messages requested
 * it means that if we request 2 messages, it should generate 2 prompts
 */
export class ManyShotStrategy implements PromptStrategy {
  constructor(
    private builder: PromptBuilder,
    /**
     * Indicate the number of posts and comments that should be passed for each prompt
     */
    private contentPerPrompt = 3,
  ) {
    // empty constructor
  }

  generatePrompts(numberOfMessages: number): PromptShot[] {
    const sender = this.builder.senderProfile
    const receiver = this.builder.receiverProfile
    const problemDescription = this.builder.problemDescription
    const solutionDescription = this.builder.solutionDescription

    const interleavedContent = this.interleaveContent(
      this.builder.senderPosts,
      this.builder.senderComments,
    )

    const receiverReactionsJSON = this.builder.receiverReactions.map(elem => elem.toJSON())
    const receiverPosts = this.builder.receiverPosts.map(elem => elem.toJSON())

    const jsonSchema = getJsonSchemaResponse()
    const jsonSchemaStr = JSON.stringify(jsonSchema)

    return Array.from({ length: numberOfMessages }, (_, index) => {
      const contentForPrompt = this.getContentForPrompt(
        interleavedContent,
        index,
        numberOfMessages,
      )
      const prompt = this.createPrompt(
        sender,
        receiver,
        problemDescription,
        solutionDescription,
      )
      const contentJSON = contentForPrompt.map(elem => elem.toJSON())
      const attachments = this.createAttachments(
        contentJSON,
        receiverPosts,
        receiverReactionsJSON,
      )

      return { prompt, attachments, responseJsonSchema: jsonSchemaStr }
    })
  }

  private interleaveContent(
    posts: Post[],
    comments: SenderComment[],
  ): (Post | SenderComment)[] {
    const maxLength = posts.length + comments.length
    const interleaved: (Post | SenderComment)[] = []
    for (let i = 0; i < maxLength; i++) {
      if (i < posts.length) interleaved.push(posts[i])
      if (i < comments.length) interleaved.push(comments[i])
    }
    return interleaved
  }

  private getContentForPrompt(
    interleavedContent: (Post | SenderComment)[],
    index: number,
    numberOfMessages: number,
  ): (Post | SenderComment)[] {
    if (interleavedContent.length === 0) {
      return interleavedContent
    }

    const interleavedContentEnought = interleavedContent.slice(0)

    let contentLength = interleavedContentEnought.length
    let step = Math.floor(contentLength / numberOfMessages)

    while (step < this.contentPerPrompt) {
      interleavedContentEnought.push(...interleavedContentEnought)
      contentLength = interleavedContentEnought.length
      step = Math.floor(contentLength / this.contentPerPrompt)
    }

    step = step > this.contentPerPrompt ? step : this.contentPerPrompt
    const start = index * this.contentPerPrompt
    return interleavedContent.slice(start, start + step)
  }

  private createPrompt(
    sender: { firstName: string; lastName: string; headline: string },
    receiver: { firstName: string; lastName: string; headline: string },
    problemDescription: string,
    solutionDescription: string,
  ): string {
    return prompt1(
      sender.firstName,
      sender.lastName,
      sender.headline,
      receiver.firstName,
      receiver.lastName,
      receiver.headline,
      problemDescription,
      solutionDescription,
      1,
    )
  }

  private createAttachments(
    senderPostsAndComments: (PostPayload | SenderCommentPayload)[],
    receiverPosts: PostPayload[],
    receiverReactions: ReceiverReactionPayload[],
  ): string[] {
    const builderJSON = this.builder.toJSON()
    return [
      JSON.stringify({
        senderProfile: builderJSON.senderProfile,
        receiverProfile: builderJSON.receiverProfile,
        problemDescription: builderJSON.problemDescription,
        solutionDescription: builderJSON.solutionDescription,
        messagesTemplates: builderJSON.messagesTemplates,
      }),
      JSON.stringify({
        senderPostsAndComments,
        receiverPosts,
        receiverReactions,
      }),
    ]
  }
}
