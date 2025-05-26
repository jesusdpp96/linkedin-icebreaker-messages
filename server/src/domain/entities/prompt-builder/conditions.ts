import { z } from 'zod'
import { Profile } from '../profile/definition'
import { Post } from '../post/definition'
import { SenderComment } from '../sender-comment/definition'
import { ReceiverReaction } from '../receiver-reaction/definition'
import { conditions as IMRConditions } from '../icebreaker-messages-request/conditions'
import { MessageTemplate } from '../message-template'
/**
 * Specifies the validation rules for each property of the Prompt.
 */
export const conditions = z.object({
  senderProfile: z.custom<Profile>(value => value instanceof Profile),
  receiverProfile: z.custom<Profile>(value => value instanceof Profile),
  senderPosts: z.array(z.custom<Post>(value => value instanceof Post)),
  receiverPosts: z.array(z.custom<Post>(value => value instanceof Post)),
  senderComments: z.array(z.custom<SenderComment>(value => value instanceof SenderComment)),
  receiverReactions: z.array(
    z.custom<ReceiverReaction>(value => value instanceof ReceiverReaction),
  ),
  problemDescription: IMRConditions.shape.problemDescription,
  solutionDescription: IMRConditions.shape.solutionDescription,
  messagesTemplates: z.array(
    z.custom<MessageTemplate>(value => value instanceof MessageTemplate),
  ),
})
