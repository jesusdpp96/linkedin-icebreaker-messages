import type {
  IcebreakerMessagesRequest,
  Post,
  Profile,
  SenderComment,
  ReceiverReaction,
} from '@domain'
import type { Result } from 'ts-results'
import type { InputDto } from './input.dto'

export interface ServicePort {
  getRequest(input: InputDto): Result<IcebreakerMessagesRequest, Error>
  getLinkedinProfile(url: string): Promise<Result<Profile, Error>>
  getLinkedinPosts(profile: Profile): Promise<Result<Post[], Error>>
  getLinkedinSenderComments(profile: Profile): Promise<Result<SenderComment[], Error>>
  getLinkedinReceiverReactions(profile: Profile): Promise<Result<ReceiverReaction[], Error>>
  askToAI(prompt: string, jsonsAsAttachment: string[]): Promise<Result<string, Error>>
}
