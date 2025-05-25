import { RuleValidationError, type ToJsonMethod } from '../../base'
import { conditions, AdjustToConditions } from './conditions'
import type { Payload } from './payload'

export class IcebreakerMessage implements ToJsonMethod<Payload> {
  /**
   * Only can be created by the static method `create`
   */
  private constructor(
    public message: string,
    public templateTitle: string,
    public templateCategory: string,
    public instruction: string,
    public sourcePosts: string[],
    public receiverName: string,
    public receiverProfilePicture: string,
    public receiverHeadline: string,
    public senderName: string,
    public senderProfilePicture: string,
    public senderHeadline: string,
  ) {
    // empty
  }
  /**
   * Method to create a IcebreakerMessage instance
   * Apply the conditions to the payload
   */
  public static create(payload: Payload): IcebreakerMessage {
    const payloadAdjusted = AdjustToConditions.apply(payload)
    const parse = conditions.safeParse(payloadAdjusted)
    if (!parse.success) {
      const creationError = new RuleValidationError(IcebreakerMessage.name, {
        issues: parse.error.issues,
      })
      throw creationError
    }

    return new IcebreakerMessage(
      parse.data.message,
      parse.data.templateTitle,
      parse.data.templateCategory,
      parse.data.instruction,
      parse.data.sourcePosts,
      parse.data.receiverName,
      parse.data.receiverProfilePicture,
      parse.data.receiverHeadline,
      parse.data.senderName,
      parse.data.senderProfilePicture,
      parse.data.senderHeadline,
    )
  }

  public toJSON(): Payload {
    return {
      message: this.message,
      templateTitle: this.templateTitle,
      templateCategory: this.templateCategory,
      instruction: this.instruction,
      sourcePosts: this.sourcePosts,
      receiverName: this.receiverName,
      receiverProfilePicture: this.receiverProfilePicture,
      receiverHeadline: this.receiverHeadline,
      senderName: this.senderName,
      senderProfilePicture: this.senderProfilePicture,
      senderHeadline: this.senderHeadline,
    }
  }
}
