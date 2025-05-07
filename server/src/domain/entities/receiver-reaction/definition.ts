import type { Result } from 'ts-results'
import { Err, Ok } from 'ts-results'
import type { PrimitiveMethod } from '../../base'
import { conditions } from './conditions'
import type { Payload } from './payload'

export class ReceiverReaction implements PrimitiveMethod<Payload> {
  /**
   * Only can be created by the static method `of`
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
  public static of(payload: Payload): Result<ReceiverReaction, Error> {
    const parse = conditions.safeParse(payload)

    if (!parse.success) {
      const newParse = JSON.parse(JSON.stringify(parse))
      newParse.domain = `ReceiverReaction`
      return Err(new Error(JSON.stringify(newParse)))
    }

    return Ok(
      new ReceiverReaction(
        parse.data.id,
        parse.data.reactedToContent,
        parse.data.reaction,
        parse.data.reactionByUsername,
      ),
    )
  }

  public toPrimitive(): Payload {
    return {
      id: this.id,
      reactedToContent: this.reactedToContent,
      reaction: this.reaction,
      reactionByUsername: this.reactionByUsername,
    }
  }
}
