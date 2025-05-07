import { Ok, type Result } from 'ts-results'
import { ReceiverReaction } from '@domain'
import { SenderComment } from '@domain'
import { Post } from '@domain'
import { IcebreakerMessagesRequest, Profile } from '@domain'
import type { InputDto } from '../../use-case'
import type { ServicePort } from '../../use-case/service.port'
import type { DriverPort } from './driver.port'

export class Adapter implements ServicePort {
  constructor(public driver: DriverPort) {
    // Empty
  }
  /**
   * Get a IcebreakerMessagesRequest by its id
   * @param input
   */
  public getRequest(input: InputDto): Result<IcebreakerMessagesRequest, Error> {
    return IcebreakerMessagesRequest.of(input)
  }

  /**
   * Get a Linkedin profile by its url
   * @param url
   */
  public async getLinkedinProfile(url: string): Promise<Result<Profile, Error>> {
    const profileResult = await this.driver.getProfile(url)
    if (profileResult.err) {
      return profileResult
    }
    const profileData = profileResult.val
    return Profile.of(profileData)
  }

  /**
   * Get all posts related to a profile
   * @param profile
   */

  public async getLinkedinPosts(profile: Profile): Promise<Result<Post[], Error>> {
    const postsResult = await this.driver.getPosts(profile.username)
    if (postsResult.err) {
      return postsResult
    }
    const postsData = postsResult.val
    const posts: Post[] = []
    for (const postData of postsData) {
      const postResult = Post.of(postData)
      if (postResult.err) {
        return postResult
      }
      posts.push(postResult.val)
    }
    return Ok(posts)
  }

  /**
   * Get all comments related to a profile
   * @param profile
   */
  public async getLinkedinSenderComments(
    profile: Profile,
  ): Promise<Result<SenderComment[], Error>> {
    const commentsResult = await this.driver.getComments(profile.username)
    if (commentsResult.err) {
      return commentsResult
    }
    const commentsData = commentsResult.val
    const comments: SenderComment[] = []
    for (const commentData of commentsData) {
      const commentResult = SenderComment.of(commentData)
      if (commentResult.err) {
        return commentResult
      }
      comments.push(commentResult.val)
    }
    return Ok(comments)
  }

  /**
   * Get all reactions related to a profile
   * @param profile
   */
  public async getLinkedinReceiverReactions(
    profile: Profile,
  ): Promise<Result<ReceiverReaction[], Error>> {
    const reactionsResult = await this.driver.getReactions(profile.username)
    if (reactionsResult.err) {
      return reactionsResult
    }
    const reactionsData = reactionsResult.val
    const reactions: ReceiverReaction[] = []
    for (const reactionData of reactionsData) {
      const reactionResult = ReceiverReaction.of(reactionData)
      if (reactionResult.err) {
        return reactionResult
      }
      reactions.push(reactionResult.val)
    }
    return Ok(reactions)
  }

  /**
   *  Ask to AI
   * @param prompt
   * @param jsonsAsAttachment
   */
  public async askToAI(
    prompt: string,
    jsonsAsAttachment: string[],
  ): Promise<Result<string, Error>> {
    return this.driver.askToAI(prompt, jsonsAsAttachment)
  }
}
