import type {
  PostPayload,
  ProfilePayload,
  ReceiverReactionPayload,
  SenderCommentPayload,
} from '@domain'

export interface ServiceDriverPort {
  getProfile(url: string): Promise<ProfilePayload>
  getPosts(username: string): Promise<PostPayload[]>
  getComments(username: string): Promise<SenderCommentPayload[]>
  getReactions(username: string): Promise<ReceiverReactionPayload[]>
  askToAI(
    prompt: string,
    jsonsAsAttachment: string[],
    structuredResponseSchema: string,
  ): Promise<string>
}
