import { z } from 'zod'
import { cropString } from '../../zod-utils'

/**
 * Specifies the validation rules for each property of the icebreaker message.
 * These rules define the expected structure, constraints, and data types
 * for the properties to ensure they meet the required conditions.
 */
export const conditions = z.object({
  /**
   * The message should be a concise summary of the icebreaker message.
   * It is important for the AI to understand that it must generate a message
   * in a maximum of 300 characters. Therefore, the prompt must ensure that the AI
   * does not generate more than 300 characters.
   */
  message: z.string().min(100).max(300),
  templateTitle: z.string().min(1),
  templateCategory: z.string().min(1),
  instruction: z.string().min(1).max(500),
  sourcePosts: z.array(z.number()),
  receiverName: z.string().min(1).max(100),
  receiverProfilePicture: z.string().url(),
  receiverHeadline: z.string().max(200),
  senderName: z.string().min(1).max(100),
  senderProfilePicture: z.string(),
  senderHeadline: z.string().max(200),
})

/**
 * Defines how values are adjusted to the conditions
 * when parsing an object. Only for properties where
 * it makes sense to adjust.
 *
 * Example: if a property is a string with a maximum of 500 characters,
 * but the message exceeds 500, it is cropped to 500 (this makes sense).
 */
export class AdjustToConditions {
  public static overInstruction(instruction: string): string {
    return cropString(conditions.shape.instruction, instruction)
  }
  public static overReceiverName(receiverName: string): string {
    return cropString(conditions.shape.receiverName, receiverName)
  }
  public static overSenderName(senderName: string): string {
    return cropString(conditions.shape.senderName, senderName)
  }
  public static overReceiverHeadline(receiverHeadline: string): string {
    return cropString(conditions.shape.receiverHeadline, receiverHeadline)
  }
  public static overSenderHeadline(senderHeadline: string): string {
    return cropString(conditions.shape.senderHeadline, senderHeadline)
  }

  /**
   * Applies the adjustments to the payload based on the defined conditions.
   */
  public static apply(payload: z.infer<typeof conditions>): z.infer<typeof conditions> {
    return {
      ...payload,
      instruction: AdjustToConditions.overInstruction(payload.instruction),
      receiverName: AdjustToConditions.overReceiverName(payload.receiverName),
      senderName: AdjustToConditions.overSenderName(payload.senderName),
      receiverHeadline: AdjustToConditions.overReceiverHeadline(payload.receiverHeadline),
      senderHeadline: AdjustToConditions.overSenderHeadline(payload.senderHeadline),
    }
  }
}
