import { z } from 'zod'
import { extractMatchedRegexp } from '../../zod-utils'

const linkedinProfileRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9%-]+\/?/

/**
 * Specifies the validation rules for each property of the icebreaker message request.
 * These rules define the expected structure, constraints, and data types
 * for the properties to ensure they meet the required conditions.
 */
export const conditions = z.object({
  senderLinkedinUrl: z.string().regex(linkedinProfileRegex, 'sender-invalid-url'),
  /**
   * The problem description should be a concise summary of the issue.
   * It is important for the user to understand that they must describe the problem
   * in a maximum of 1500 characters. Therefore, the application client
   * must ensure that the user does not write more than 1500 characters.
   */
  problemDescription: z.string().min(1).max(1500),
  /**
   * The solution description should be a concise summary of the proposed solution.
   * It is important for the user to understand that they must describe the solution
   * in a maximum of 1500 characters. Therefore, the application client
   * must ensure that the user does not write more than 1500 characters.
   */
  solutionDescription: z.string().min(1).max(1500),
  receiverLinkedinUrl: z.string().regex(linkedinProfileRegex, 'receiver-invalid-url'),
})

/**
 * Defines how values are adjusted to the conditions
 * when parsing an object. Only for properties where
 * it makes sense to adjust.
 *
 */
export class AdjustToConditions {
  public static overSenderLinkedinUrl = (value: string): string => {
    return extractMatchedRegexp(conditions.shape.senderLinkedinUrl, value)
  }
  public static overReceiverLinkedinUrl = (value: string): string => {
    return extractMatchedRegexp(conditions.shape.receiverLinkedinUrl, value)
  }
  /**
   * Aplies the adjustments to the payload based on the defined conditions.
   *
   * Note: For this entity, no adjustments are made,
   * as the conditions are already strict and do not require cropping or modification.
   */
  public static apply(payload: z.infer<typeof conditions>): z.infer<typeof conditions> {
    return {
      ...payload,
      senderLinkedinUrl: AdjustToConditions.overSenderLinkedinUrl(payload.senderLinkedinUrl),
      receiverLinkedinUrl: AdjustToConditions.overReceiverLinkedinUrl(
        payload.receiverLinkedinUrl,
      ),
    }
  }
}
