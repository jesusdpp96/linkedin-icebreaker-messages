import type {
  PostPayload,
  ProfilePayload,
  ReceiverReactionPayload,
  SenderCommentPayload,
} from '@domain'
import type { Result } from 'ts-results'

export interface DriverPort {
  getProfile(url: string): Promise<Result<ProfilePayload, Error>>
  getPosts(username: string): Promise<Result<PostPayload[], Error>>
  getComments(username: string): Promise<Result<SenderCommentPayload[], Error>>
  getReactions(username: string): Promise<Result<ReceiverReactionPayload[], Error>>
  askToAI(prompt: string, jsonsAsAttachment: string[]): Promise<Result<string, Error>>
}
