import { RuleValidationError, type ToJsonMethod } from '../../base'
import { AdjustToConditions, conditions } from './conditions'
import type { Payload } from './payload'

export class IcebreakerMessagesRequest implements ToJsonMethod<Payload> {
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
  public static create(payload: Payload): IcebreakerMessagesRequest {
    const payloadAdjusted = AdjustToConditions.apply(payload)
    const parse = conditions.safeParse(payloadAdjusted)

    if (!parse.success) {
      const creationError = new RuleValidationError(IcebreakerMessagesRequest.name, {
        issues: parse.error.issues,
      })

      throw creationError
    }

    return new IcebreakerMessagesRequest(
      parse.data.senderLinkedinUrl,
      parse.data.problemDescription,
      parse.data.solutionDescription,
      parse.data.receiverLinkedinUrl,
    )
  }

  public toJSON(): Payload {
    return {
      senderLinkedinUrl: this.senderLinkedinUrl,
      problemDescription: this.problemDescription,
      solutionDescription: this.solutionDescription,
      receiverLinkedinUrl: this.receiverLinkedinUrl,
    }
  }
}
