import { RuleValidationError, type ToJsonMethod } from '../../base'
import { AdjustToConditions, conditions } from './conditions'
import type { Payload } from './payload'

export class Profile implements ToJsonMethod<Payload> {
  /**
   * Only can be created by the static method `create`
   */
  private constructor(
    public id: number,
    public username: string,
    public firstName: string,
    public lastName: string,
    public profilePicture: string,
    public headline: string,
    public summary: string,
    public certifications: {
      year: number
      name: string
      institution: string
    }[],
    public lastPosition: {
      title: string
      companyName: string
      startYear: number
      startMonth: number
    } | null,
  ) {
    // empty
  }
  /**
   * Method to create a Profile instance
   * Apply the conditions to the payload
   */
  public static create(payload: Payload): Profile {
    const adjustedPayload = AdjustToConditions.apply(payload)
    const parse = conditions.safeParse(adjustedPayload)

    if (!parse.success) {
      const creationError = new RuleValidationError(Profile.name, {
        issues: parse.error.issues,
      })
      throw creationError
    }

    return new Profile(
      parse.data.id,
      parse.data.username,
      parse.data.firstName,
      parse.data.lastName,
      parse.data.profilePicture,
      parse.data.headline,
      parse.data.summary,
      parse.data.certifications,
      parse.data.lastPosition,
    )
  }

  public toJSON(): Payload {
    return {
      id: this.id,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      profilePicture: this.profilePicture,
      headline: this.headline,
      summary: this.summary,
      certifications: this.certifications,
      lastPosition: this.lastPosition,
    }
  }
}
