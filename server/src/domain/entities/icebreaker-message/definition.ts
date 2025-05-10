import type { Result } from 'ts-results'
import { Err, Ok } from 'ts-results'
import type { PrimitiveMethod } from '../../base'
import { conditions } from './conditions'
import type { Payload } from './payload'

export class IcebreakerMessage implements PrimitiveMethod<Payload> {
  /**
   * Only can be created by the static method `of`
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
  public static of(payload: Payload): Result<IcebreakerMessage, Error> {
    const parse = conditions.safeParse(payload)

    if (!parse.success) {
      const newParse = JSON.parse(JSON.stringify(parse))
      newParse.domain = `IcebreakerMessage`
      return Err(new Error(JSON.stringify(newParse)))
    }

    return Ok(
      new IcebreakerMessage(
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
      ),
    )
  }

  public toPrimitive(): Payload {
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
