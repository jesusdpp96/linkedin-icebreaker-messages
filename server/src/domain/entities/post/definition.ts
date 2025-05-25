import { RuleValidationError, type ToJsonMethod } from '../../base'
import { AdjustToConditions, conditions } from './conditions'
import type { Payload } from './payload'

export class Post implements ToJsonMethod<Payload> {
  /**
   * Only can be created by the static method `create`
   */

  private constructor(
    public id: number,
    public postedContent: string,
    public publicationUrl: string,
    public postedDate: string,
    public authorUsername: string,
    public hasMediaContent: boolean,
  ) {
    // empty
  }
  /**
   * Method to create a Post instance
   * Apply the conditions to the payload
   */
  public static create(payload: Payload): Post {
    const adjustedPayload = AdjustToConditions.apply(payload)
    const parse = conditions.safeParse(adjustedPayload)

    if (!parse.success) {
      const creationError = new RuleValidationError(Post.name, { issues: parse.error.issues })
      throw creationError
    }

    return new Post(
      parse.data.id,
      parse.data.postedContent,
      parse.data.publicationUrl,
      parse.data.postedDate,
      parse.data.authorUsername,
      parse.data.hasMediaContent,
    )
  }

  public toJSON(): Payload {
    return {
      id: this.id,
      postedContent: this.postedContent,
      publicationUrl: this.publicationUrl,
      postedDate: this.postedDate,
      authorUsername: this.authorUsername,
      hasMediaContent: this.hasMediaContent,
    }
  }
}
