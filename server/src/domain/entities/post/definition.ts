import type { Result } from 'ts-results'
import { Err, Ok } from 'ts-results'
import type { PrimitiveMethod } from '../../base'
import { conditions } from './conditions'
import type { Payload } from './payload'

export class Post implements PrimitiveMethod<Payload> {
  /**
   * Only can be created by the static method `of`
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
  public static of(payload: Payload): Result<Post, Error> {
    const parse = conditions.safeParse(payload)

    if (!parse.success) {
      const newParse = JSON.parse(JSON.stringify(parse))
      newParse.domain = `Post`
      return Err(new Error(JSON.stringify(newParse)))
    }

    return Ok(
      new Post(
        parse.data.id,
        parse.data.postedContent,
        parse.data.publicationUrl,
        parse.data.postedDate,
        parse.data.authorUsername,
        parse.data.hasMediaContent,
      ),
    )
  }

  public toPrimitive(): Payload {
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
