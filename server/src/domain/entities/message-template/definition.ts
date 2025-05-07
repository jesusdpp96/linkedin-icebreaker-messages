import type { Result } from 'ts-results'
import { Err, Ok } from 'ts-results'
import type { PrimitiveMethod } from '../../base'
import { conditions } from './conditions'
import type { Payload } from './payload'

export class MessageTemplate implements PrimitiveMethod<Payload> {
  /**
   * Only can be created by the static method `of`
   */
  private constructor(
    public id: number,
    public title: string,
    public category: string,
    public instruction: string,
    public example: string,
  ) {
    // empty
  }
  /**
   * Method to create a MessageTemplate instance
   * Apply the conditions to the payload
   */
  public static of(payload: Payload): Result<MessageTemplate, Error> {
    const parse = conditions.safeParse(payload)

    if (!parse.success) {
      const newParse = JSON.parse(JSON.stringify(parse))
      newParse.domain = `MessageTemplate`
      return Err(new Error(JSON.stringify(newParse)))
    }

    return Ok(
      new MessageTemplate(
        parse.data.id,
        parse.data.title,
        parse.data.category,
        parse.data.instruction,
        parse.data.example,
      ),
    )
  }

  public toPrimitive(): Payload {
    return {
      id: this.id,
      title: this.title,
      category: this.category,
      instruction: this.instruction,
      example: this.example,
    }
  }
}
