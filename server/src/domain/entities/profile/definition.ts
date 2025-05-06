import type { Result } from 'ts-results'
import { Err, Ok } from 'ts-results'
import type { PrimitiveMethod } from '@domain/base'
import { conditions } from './conditions'
import type { Payload } from './payload'

export class Profile implements PrimitiveMethod<Payload> {
  /**
   * Only can be created by the static method `of`
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
  public static of(payload: Payload): Result<Profile, Error> {
    const parse = conditions.safeParse(payload)

    if (!parse.success) {
      const newParse = JSON.parse(JSON.stringify(parse))
      newParse.domain = `Profile`
      return Err(new Error(JSON.stringify(newParse)))
    }

    return Ok(
      new Profile(
        parse.data.id,
        parse.data.username,
        parse.data.firstName,
        parse.data.lastName,
        parse.data.profilePicture,
        parse.data.headline,
        parse.data.summary,
        parse.data.certifications,
        parse.data.lastPosition,
      ),
    )
  }

  public toPrimitive(): Payload {
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
