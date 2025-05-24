import { z } from 'zod'

const urlRegex = /^(https?|ftp):\/\/([a-zA-Z0-9-]+\.)?linkedin\.com(\/[^\s]*)?$/i

/**
 * Specifies the validation rules for each property of the icebreaker message request.
 * These rules define the expected structure, constraints, and data types
 * for the properties to ensure they meet the required conditions.
 */
export const conditions = z.object({
  senderLinkedinUrl: z.string().regex(urlRegex, 'sender-invalid-url'),
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
  receiverLinkedinUrl: z.string().regex(urlRegex, 'receiver-invalid-url'),
})

/**
 * Defines how values are adjusted to the conditions
 * when parsing an object. Only for properties where
 * it makes sense to adjust.
 *
 */
export class AdjustToConditions {
  /**
   * Aplies the adjustments to the payload based on the defined conditions.
   *
   * Note: For this entity, no adjustments are made,
   * as the conditions are already strict and do not require cropping or modification.
   */
  public static apply(payload: z.infer<typeof conditions>): z.infer<typeof conditions> {
    return {
      ...payload,
    }
  }
}
