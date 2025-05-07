import type { Result } from 'ts-results'
import { Err, Ok } from 'ts-results'
import type { PrimitiveMethod } from '../../base'
import { conditions } from './conditions'
import type { Payload } from './payload'

export class SenderComment implements PrimitiveMethod<Payload> {
  /**
   * Only can be created by the static method `of`
   */
  private constructor(
    public id: number,
    public commentedContent: string,
    public commentedInPublicationUrl: string,
    public commentDate: Date,
    public authorUsername: string,
  ) {
    // empty
  }
  /**
   * Method to create a SenderComment instance
   * Apply the conditions to the payload
   */
  public static of(payload: Payload): Result<SenderComment, Error> {
    const parse = conditions.safeParse(payload)

    if (!parse.success) {
      const newParse = JSON.parse(JSON.stringify(parse))
      newParse.domain = `SenderComment`
      return Err(new Error(JSON.stringify(newParse)))
    }

    return Ok(
      new SenderComment(
        parse.data.id,
        parse.data.commentedContent,
        parse.data.commentedInPublicationUrl,
        parse.data.commentDate,
        parse.data.authorUsername,
      ),
    )
  }

  public toPrimitive(): Payload {
    return {
      id: this.id,
      commentedContent: this.commentedContent,
      commentedInPublicationUrl: this.commentedInPublicationUrl,
      commentDate: this.commentDate,
      authorUsername: this.authorUsername,
    }
  }
}
