import { z } from 'zod'
import { cropString } from '../../zod-utils'
import { conditions as IMConditions } from '../icebreaker-message/conditions'
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
  message: IMConditions.shape.message,
  templateTitle: IMConditions.shape.templateTitle,
  templateCategory: IMConditions.shape.templateCategory,
  instruction: IMConditions.shape.instruction,
  sourcePosts: IMConditions.shape.sourcePosts,
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

  /**
   * Applies the adjustments to the payload based on the defined conditions.
   */
  public static apply(payload: z.infer<typeof conditions>): z.infer<typeof conditions> {
    return {
      ...payload,
      instruction: AdjustToConditions.overInstruction(payload.instruction),
    }
  }
}
