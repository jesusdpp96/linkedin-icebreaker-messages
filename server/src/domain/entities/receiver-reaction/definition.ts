import { RuleValidationError, type ToJsonMethod } from '../../base'
import { AdjustToConditions, conditions } from './conditions'
import type { Payload } from './payload'

export class ReceiverReaction implements ToJsonMethod<Payload> {
  /**
   * Only can be created by the static method `create`
   */
  private constructor(
    public id: number,
    public reactedToContent: string,
    public reaction: string,
    public reactionByUsername: string,
  ) {
    // empty
  }
  /**
   * Method to create a ReceiverReaction instance
   * Apply the conditions to the payload
   */
  public static create(payload: Payload): ReceiverReaction {
    const adjustedPayload = AdjustToConditions.apply(payload)
    const parse = conditions.safeParse(adjustedPayload)

    if (!parse.success) {
      const creationError = new RuleValidationError(ReceiverReaction.name, {
        issues: parse.error.issues,
      })
      throw creationError
    }

    return new ReceiverReaction(
      parse.data.id,
      parse.data.reactedToContent,
      parse.data.reaction,
      parse.data.reactionByUsername,
    )
  }

  public toJSON(): Payload {
    return {
      id: this.id,
      reactedToContent: this.reactedToContent,
      reaction: this.reaction,
      reactionByUsername: this.reactionByUsername,
    }
  }
}
