import { RuleValidationError, type ToJsonMethod } from '../../base'
import { AdjustToConditions, conditions } from './conditions'
import type { Payload } from './payload'

export class IcebreakerMessagesRequest implements ToJsonMethod<Payload> {
  public senderUsername: string
  public receiverUsername: string
  /**
   * Only can be created by the static method `create`
   */
  private constructor(
    public senderLinkedinUrl: string,
    public problemDescription: string,
    public solutionDescription: string,
    public receiverLinkedinUrl: string,
  ) {
    this.senderUsername = this.extractUsernameFromUrl(senderLinkedinUrl)
    this.receiverUsername = this.extractUsernameFromUrl(receiverLinkedinUrl)
  }
  /**
   * Method to create a IcebreakerMessagesRequest instance
   * Apply the conditions to the payload
   */
  public static create(payload: Payload): IcebreakerMessagesRequest {
    const payloadAdjusted = AdjustToConditions.apply(payload)
    const parse = conditions.safeParse(payloadAdjusted)

    if (!parse.success) {
      const creationError = new RuleValidationError(IcebreakerMessagesRequest.name, {
        issues: parse.error.issues,
      })

      throw creationError
    }

    return new IcebreakerMessagesRequest(
      parse.data.senderLinkedinUrl,
      parse.data.problemDescription,
      parse.data.solutionDescription,
      parse.data.receiverLinkedinUrl,
    )
  }

  public toJSON(): Payload {
    return {
      senderLinkedinUrl: this.senderLinkedinUrl,
      problemDescription: this.problemDescription,
      solutionDescription: this.solutionDescription,
      receiverLinkedinUrl: this.receiverLinkedinUrl,
    }
  }

  /**
   * Extracts the username from a LinkedIn profile URL.
   * The username is the part after "/in/" in the URL.
   *
   * @param url
   */
  extractUsernameFromUrl(url: string): string {
    const regex = /^https?:\/\/(www\.)?linkedin\.com\/in\/([A-Za-z0-9%-]+)\/?$/
    const match = url.match(regex)
    if (match && match[2]) {
      // Decodifica caracteres URL-encoded, como %C3%B1 => ñ
      return decodeURIComponent(match[2])
    }
    // The username will never be '' because the validation in the conditions ensure a well-formed url
    return ''
  }
}
