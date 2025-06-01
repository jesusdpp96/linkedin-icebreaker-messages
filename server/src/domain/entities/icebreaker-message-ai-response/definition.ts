import { RuleValidationError, type ToJsonMethod } from '../../base'
import { conditions, AdjustToConditions } from './conditions'
import type { Payload } from './payload'

export class IcebreakerMessageAiResponse implements ToJsonMethod<Payload> {
  /**
   * Only can be created by the static method `create`
   */
  private constructor(
    public message: string,
    public templateTitle: string,
    public templateCategory: string,
    public instruction: string,
    public sourcePosts: number[],
  ) {
    // empty
  }
  /**
   * Method to create a IcebreakerMessageAiResponse instance
   * Apply the conditions to the payload
   */
  public static create(payload: Payload): IcebreakerMessageAiResponse {
    const payloadAdjusted = AdjustToConditions.apply(payload)
    const parse = conditions.safeParse(payloadAdjusted)
    if (!parse.success) {
      const creationError = new RuleValidationError(IcebreakerMessageAiResponse.name, {
        issues: parse.error.issues,
      })
      throw creationError
    }

    return new IcebreakerMessageAiResponse(
      parse.data.message,
      parse.data.templateTitle,
      parse.data.templateCategory,
      parse.data.instruction,
      parse.data.sourcePosts,
    )
  }

  public toJSON(): Payload {
    return {
      message: this.message,
      templateTitle: this.templateTitle,
      templateCategory: this.templateCategory,
      instruction: this.instruction,
      sourcePosts: this.sourcePosts,
    }
  }
}
