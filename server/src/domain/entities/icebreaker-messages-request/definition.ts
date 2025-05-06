import type { Result } from 'ts-results'
import { Err, Ok } from 'ts-results'
import type { PrimitiveMethod } from '@domain/base'
import { conditions } from './conditions'
import type { Payload } from './payload'

export class IcebreakerMessagesRequest implements PrimitiveMethod<Payload> {
  /**
   * Only can be created by the static method `of`
   */

  private constructor(
    public senderLinkedinUrl: string,
    public problemDescription: string,
    public solutionDescription: string,
    public receiverLinkedinUrl: string,
  ) {
    // empty
  }
  /**
   * Method to create a IcebreakerMessagesRequest instance
   * Apply the conditions to the payload
   */
  public static of(payload: Payload): Result<IcebreakerMessagesRequest, Error> {
    const parse = conditions.safeParse(payload)

    if (!parse.success) {
      const newParse = JSON.parse(JSON.stringify(parse))
      newParse.domain = `IcebreakerMessagesRequest`
      return Err(new Error(JSON.stringify(newParse)))
    }

    return Ok(
      new IcebreakerMessagesRequest(
        parse.data.senderLinkedinUrl,
        parse.data.problemDescription,
        parse.data.solutionDescription,
        parse.data.receiverLinkedinUrl,
      ),
    )
  }

  public toPrimitive(): Payload {
    return {
      senderLinkedinUrl: this.senderLinkedinUrl,
      problemDescription: this.problemDescription,
      solutionDescription: this.solutionDescription,
      receiverLinkedinUrl: this.receiverLinkedinUrl,
    }
  }
}
