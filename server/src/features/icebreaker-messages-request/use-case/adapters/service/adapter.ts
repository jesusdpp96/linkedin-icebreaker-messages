import { CatchedInAdapter } from '@domain'
import { Err, Ok, type Result } from 'ts-results'
import { ReceiverReaction, IcebreakerMessageAiResponse } from '@domain'
import { SenderComment } from '@domain'
import { Post } from '@domain'
import { IcebreakerMessagesRequest, Profile } from '@domain'
import type { PromptShot, ErrorsCollection } from '@domain'
import type { ServiceDriverPort } from './driver.port'
import type { InputDto } from '../../input.dto'

export class ServiceAdapter {
  constructor(private readonly driver: ServiceDriverPort) {
    // Empty
  }

  /**
   * Get a IcebreakerMessagesRequest by its id
   * @param input
   */
  public getRequest(input: InputDto): IcebreakerMessagesRequest {
    return IcebreakerMessagesRequest.create(input)
  }
  /**
   * Get all data related to a Linkedin context
   * @param request
   */
  public async getLinkedinData(request: IcebreakerMessagesRequest): Promise<{
    senderProfile: Profile
    senderPosts: Post[]
    senderComments: SenderComment[]
    receiverProfile: Profile
    receiverPosts: Post[]
    receiverReactions: ReceiverReaction[]
  }> {
    const senderProfileResult = this.getLinkedinProfile(request.senderLinkedinUrl)
    const senderPostsResult = this.getLinkedinPosts(request.senderUsername)
    const senderCommentsResult = this.getLinkedinSenderComments(request.senderUsername)
    const receiverProfileResult = this.getLinkedinProfile(request.receiverLinkedinUrl)
    const receiverPostsResult = this.getLinkedinPosts(request.receiverUsername)
    const receiverReactionsResult = this.getLinkedinReceiverReactions(request.receiverUsername)
    const promise = await Promise.all([
      senderProfileResult,
      senderPostsResult,
      senderCommentsResult,
      receiverProfileResult,
      receiverPostsResult,
      receiverReactionsResult,
    ])
    const errors: ErrorsCollection[] = []
    for (const result of promise) {
      if (result.err) {
        errors.push(result.val)
      }
    }
    if (errors.length > 0) {
      const firstError = errors[0]
      firstError.addContext(ServiceAdapter.name, this.generateMessages.name)
      for (let index = 1; index < errors.length; index++) {
        const nextError = errors[index]
        nextError.addContext(ServiceAdapter.name, this.generateMessages.name)
        firstError.addAdditionalError(nextError)
      }
      throw firstError
    }
    return {
      senderProfile: promise[0].val as Profile,
      senderPosts: promise[1].val as Post[],
      senderComments: promise[2].val as SenderComment[],
      receiverProfile: promise[3].val as Profile,
      receiverPosts: promise[4].val as Post[],
      receiverReactions: promise[5].val as ReceiverReaction[],
    }
  }
  /**
   *  Generate messages using AI based on the provided shots
   * @param prompt
   * @param jsonsAsAttachment
   */
  public async generateMessages(shots: PromptShot[]): Promise<IcebreakerMessageAiResponse[]> {
    const promises = shots.map(shot => this.proccessOneShot(shot))
    const results = await Promise.all(promises)
    const errors: ErrorsCollection[] = []
    const responses: IcebreakerMessageAiResponse[] = []
    for (const result of results) {
      if (result.err) {
        errors.push(result.val)
      } else {
        responses.push(...(result.val as IcebreakerMessageAiResponse[]))
      }
    }
    if (errors.length > 0) {
      const firstError = errors[0]
      firstError.addContext(ServiceAdapter.name, this.generateMessages.name)
      for (let index = 1; index < errors.length; index++) {
        const nextError = errors[index]
        nextError.addContext(ServiceAdapter.name, this.generateMessages.name)
        firstError.addAdditionalError(nextError)
      }
      throw firstError
    }
    const values = results.map(result => result.val as IcebreakerMessageAiResponse[])
    const messages: IcebreakerMessageAiResponse[] = values.reduce(
      (acc, curr) => [...acc, ...curr],
      [] as IcebreakerMessageAiResponse[],
    )
    return messages
  }
  /**
   * Ask to AI for a response based on the provided shot
   * @param shot
   */
  private async proccessOneShot(
    shot: PromptShot,
  ): Promise<Result<IcebreakerMessageAiResponse[], ErrorsCollection>> {
    try {
      const response = await this.driver.askToAI(shot.prompt, [
        ...shot.attachments,
        shot.responseJsonSchema,
      ])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataArr: any[] = JSON.parse(response)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const elems = dataArr.map((item: any) => {
        return IcebreakerMessageAiResponse.create(item)
      })
      return Ok(elems)
    } catch (err) {
      const handler = new CatchedInAdapter(
        err as Error,
        ServiceAdapter.name,
        this.proccessOneShot.name,
        { shot: '<private>' },
      )
      return Err(handler.adjust())
    }
  }
  /**
   * Get a Linkedin profile by its url
   * @param url
   */
  private async getLinkedinProfile(url: string): Promise<Result<Profile, ErrorsCollection>> {
    try {
      const profilePayload = await this.driver.getProfile(url)
      const profile = Profile.create(profilePayload)
      return Ok(profile)
    } catch (err) {
      const handler = new CatchedInAdapter(
        err as Error,
        ServiceAdapter.name,
        this.getLinkedinProfile.name,
        { url },
      )
      return Err(handler.adjust())
    }
  }
  /**
   * Get all posts related to a profile
   * @param profile
   */
  private async getLinkedinPosts(
    profileUsername: string,
  ): Promise<Result<Post[], ErrorsCollection>> {
    try {
      const postsPayloads = await this.driver.getPosts(profileUsername)
      const posts: Post[] = []
      for (const payload of postsPayloads) {
        const post = Post.create(payload)
        posts.push(post)
      }
      return Ok(posts)
    } catch (err) {
      const handler = new CatchedInAdapter(
        err as Error,
        ServiceAdapter.name,
        this.getLinkedinPosts.name,
        { profileUsername },
      )
      return Err(handler.adjust())
    }
  }
  /**
   * Get all comments related to a profile
   * @param profile
   */
  private async getLinkedinSenderComments(
    profileUsername: string,
  ): Promise<Result<SenderComment[], ErrorsCollection>> {
    try {
      const commentsPayloads = await this.driver.getComments(profileUsername)
      const comments: SenderComment[] = []
      for (const commentData of commentsPayloads) {
        const comment = SenderComment.create(commentData)
        comments.push(comment)
      }
      return Ok(comments)
    } catch (err) {
      const handler = new CatchedInAdapter(
        err as Error,
        ServiceAdapter.name,
        this.getLinkedinSenderComments.name,
        { profileUsername },
      )
      return Err(handler.adjust())
    }
  }
  /**
   * Get all reactions related to a profile
   * @param profile
   */
  private async getLinkedinReceiverReactions(
    profileUsername: string,
  ): Promise<Result<ReceiverReaction[], ErrorsCollection>> {
    try {
      const reactionsPayloads = await this.driver.getReactions(profileUsername)
      const reactions: ReceiverReaction[] = []
      for (const payload of reactionsPayloads) {
        const reaction = ReceiverReaction.create(payload)
        reactions.push(reaction)
      }
      return Ok(reactions)
    } catch (err) {
      const handler = new CatchedInAdapter(
        err as Error,
        ServiceAdapter.name,
        this.getLinkedinReceiverReactions.name,
        { profileUsername },
      )
      return Err(handler.adjust())
    }
  }
}
