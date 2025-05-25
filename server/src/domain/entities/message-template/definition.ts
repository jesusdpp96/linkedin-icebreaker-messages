import { RuleValidationError, type ToJsonMethod } from '../../base'
import { conditions } from './conditions'
import type { Payload } from './payload'

export class MessageTemplate implements ToJsonMethod<Payload> {
  /**
   * Only can be created by the static method `create`
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
  public static create(payload: Payload): MessageTemplate {
    const parse = conditions.safeParse(payload)

    if (!parse.success) {
      const creationError = new RuleValidationError(MessageTemplate.name, {
        issues: parse.error.issues,
      })
      throw creationError
    }

    return new MessageTemplate(
      parse.data.id,
      parse.data.title,
      parse.data.category,
      parse.data.instruction,
      parse.data.example,
    )
  }

  public toJSON(): Payload {
    return {
      id: this.id,
      title: this.title,
      category: this.category,
      instruction: this.instruction,
      example: this.example,
    }
  }
}
