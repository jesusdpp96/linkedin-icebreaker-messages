import type { z } from 'zod'
import { RuleValidationError, type ToJsonMethod } from '../../base'
import type { Post } from '../post'
import type { conditions as postConditions } from '../post/conditions'
import type { Profile } from '../profile'
import type { conditions as profileConditions } from '../profile/conditions'
import type { ReceiverReaction } from '../receiver-reaction'
import type { conditions as receiverReactionConditions } from '../receiver-reaction/conditions'
import type { SenderComment } from '../sender-comment'
import type { conditions as SenderCommentConditions } from '../sender-comment/conditions'
import { conditions } from './conditions'
import type { conditions as IMRConditions } from '../icebreaker-messages-request/conditions'
import type { conditions as MessageTemplateConditions } from '../message-template/conditions'

import type { Payload } from './payload'
import type { MessageTemplate } from '../message-template'
import type { PromptShot } from './strategy/prompt-strategy'
import { PromptContext } from './strategy'
import type { Strategy } from './strategy'

type PromptJson = {
  senderProfile: z.input<typeof profileConditions>
  receiverProfile: z.input<typeof profileConditions>
  senderPosts: z.input<typeof postConditions>[]
  receiverPosts: z.input<typeof postConditions>[]
  senderComments: z.input<typeof SenderCommentConditions>[]
  receiverReactions: z.input<typeof receiverReactionConditions>[]
  problemDescription: z.input<typeof IMRConditions.shape.problemDescription>
  solutionDescription: z.input<typeof IMRConditions.shape.solutionDescription>
  messagesTemplates: z.input<typeof MessageTemplateConditions>[]
}

export class PromptBuilder implements ToJsonMethod<PromptJson> {
  /**
   * Only can be created by the static method `create`
   */
  private constructor(
    public senderProfile: Profile,
    public receiverProfile: Profile,
    public senderPosts: Post[],
    public receiverPosts: Post[],
    public senderComments: SenderComment[],
    public receiverReactions: ReceiverReaction[],
    public problemDescription: string,
    public solutionDescription: string,
    public messagesTemplates: MessageTemplate[],
  ) {
    // empty
  }

  /**
   * Method to create a PromptBuilder instance
   */
  public static create(payload: Payload): PromptBuilder {
    const parse = conditions.safeParse(payload)

    if (!parse.success) {
      const creationError = new RuleValidationError(PromptBuilder.name, {
        issues: parse.error.issues,
      })

      throw creationError
    }

    return new PromptBuilder(
      parse.data.senderProfile,
      parse.data.receiverProfile,
      parse.data.senderPosts,
      parse.data.receiverPosts,
      parse.data.senderComments,
      parse.data.receiverReactions,
      parse.data.problemDescription,
      parse.data.solutionDescription,
      parse.data.messagesTemplates,
    )
  }

  public toJSON(): PromptJson {
    return {
      senderProfile: this.senderProfile.toJSON(),
      receiverProfile: this.receiverProfile.toJSON(),
      senderPosts: this.senderPosts.map(post => post.toJSON()),
      receiverPosts: this.receiverPosts.map(post => post.toJSON()),
      senderComments: this.senderComments.map(comment => comment.toJSON()),
      receiverReactions: this.receiverReactions.map(reaction => reaction.toJSON()),
      problemDescription: this.problemDescription,
      solutionDescription: this.solutionDescription,
      messagesTemplates: this.messagesTemplates.map(msg => msg.toJSON()),
    }
  }

  public generatePrompts(numberOfMessages: number, strategy?: Strategy): PromptShot[] {
    const context = new PromptContext(this)
    if (strategy) {
      context.setStrategy(strategy)
    }
    return context.generatePrompts(numberOfMessages)
  }

  public getSenderPostUrl(postId: number): string {
    const post = this.senderPosts.find(p => p.id === postId)
    return post?.publicationUrl || ''
  }
}
