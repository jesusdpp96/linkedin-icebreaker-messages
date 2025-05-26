import type { PromptBuilder } from '../definition'
import { prompt1 } from '../prompts/prompt1'
import { getJsonSchemaResponse } from './json-schema-response'
import type { PromptShot, PromptStrategy } from './prompt-strategy'

/**
 * The OneShotStrategy should always generate exactly one prompt,
 */
export class OneShotStrategy implements PromptStrategy {
  constructor(private builder: PromptBuilder) {
    // empty constructor
  }
  generatePrompts(numberOfMessages: number): PromptShot[] {
    const sender = this.builder.senderProfile
    const receiver = this.builder.receiverProfile
    const problemDescription = this.builder.problemDescription
    const solutionDescription = this.builder.solutionDescription
    const prompt = prompt1(
      sender.firstName,
      sender.lastName,
      sender.headline,
      receiver.firstName,
      receiver.lastName,
      receiver.headline,
      problemDescription,
      solutionDescription,
      numberOfMessages,
    )
    const builderJSON = this.builder.toJSON()
    const jsonSchema = getJsonSchemaResponse()

    const attachments = [
      JSON.stringify({
        senderProfile: builderJSON.senderProfile,
        receiverProfile: builderJSON.receiverPosts,
        problemDescription: builderJSON.problemDescription,
        solutionDescription: builderJSON.solutionDescription,
        messagesTemplates: builderJSON.messagesTemplates,
      }),
      JSON.stringify({
        senderPosts: builderJSON.senderPosts,
        receiverPosts: builderJSON.receiverPosts,
        senderComments: builderJSON.senderComments,
        receiverReactions: builderJSON.receiverReactions,
      }),
    ]
    return [
      {
        prompt: prompt,
        attachments: attachments,
        responseJsonSchema: JSON.stringify(jsonSchema),
      },
    ]
  }
}
