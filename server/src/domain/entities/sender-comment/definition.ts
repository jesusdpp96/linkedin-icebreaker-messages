import { RuleValidationError, type ToJsonMethod } from '../../base'
import { AdjustToConditions, conditions } from './conditions'
import type { Payload } from './payload'

export class SenderComment implements ToJsonMethod<Payload> {
  /**
   * Only can be created by the static method `create`
   */
  private constructor(
    public id: number,
    public commentedContent: string,
    public commentedInPublicationUrl: string,
    public commentDate: string,
    public authorUsername: string,
  ) {
    // empty
  }
  /**
   * Method to create a SenderComment instance
   * Apply the conditions to the payload
   */
  public static create(payload: Payload): SenderComment {
    const adjustedPayload = AdjustToConditions.apply(payload)
    const parse = conditions.safeParse(adjustedPayload)

    if (!parse.success) {
      const creationError = new RuleValidationError(SenderComment.name, {
        issues: parse.error.issues,
      })

      throw creationError
    }

    return new SenderComment(
      parse.data.id,
      parse.data.commentedContent,
      parse.data.commentedInPublicationUrl,
      parse.data.commentDate,
      parse.data.authorUsername,
    )
  }

  public toJSON(): Payload {
    return {
      id: this.id,
      commentedContent: this.commentedContent,
      commentedInPublicationUrl: this.commentedInPublicationUrl,
      commentDate: this.commentDate,
      authorUsername: this.authorUsername,
    }
  }
}
