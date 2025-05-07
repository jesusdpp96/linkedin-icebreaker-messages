import { Err, Ok, type Result } from 'ts-results'
import type {
  PostPayload,
  ProfilePayload,
  ReceiverReactionPayload,
  SenderCommentPayload,
} from '@domain'
import type { ServiceDriverPort } from '../../adapters/service'
import type { ServicePort } from './service.port'

export class Driver implements ServiceDriverPort {
  private postsCounter = 0
  constructor(private servicePort: ServicePort) {
    // Empty
  }
  public async getProfile(url: string): Promise<Result<ProfilePayload, Error>> {
    const profileData = await this.servicePort.linkedinService.getProfileDataByUrl(url)
    if (profileData.id === undefined) {
      return Err(new Error('Profile not found'))
    }
    let position =
      (profileData.fullPositions || []).length > 0 ? profileData.fullPositions[0] : null
    if (!position) {
      position = (profileData.position || []).length > 0 ? profileData.position[0] : null
    }
    let lastPosition = null
    if (position) {
      lastPosition = {
        title: position.title,
        companyName: position.companyName,
        startYear: position?.start?.year,
        startMonth: position?.start?.month,
      }
    }
    const profile: ProfilePayload = {
      id: profileData.id,
      username: profileData.username || '',
      firstName: profileData.firstName || '',
      lastName: profileData.lastName || '',
      profilePicture: profileData.profilePicture || '',
      headline: profileData.headline || '',
      summary: profileData.summary || '',
      certifications: (profileData.certifications || []).map(certification => ({
        year: certification?.start?.year,
        name: certification.name,
        institution: certification?.company?.name || '',
      })),
      lastPosition,
    }

    profile.summary =
      profile.summary.length > 500 ? profile.summary.substring(0, 500) : profile.summary

    return Ok(profile)
  }
  public async getPosts(username: string): Promise<Result<PostPayload[], Error>> {
    const posts = await this.servicePort.linkedinService.getProfilePosts(username)
    if (!posts.success) {
      return Err(new Error(posts.message))
    }
    const postsData = posts.data
    const postsPayload: PostPayload[] = (postsData || []).map(post => {
      this.postsCounter++
      return {
        id: this.postsCounter,
        postedContent: post.text,
        publicationUrl: post.postUrl,
        postedDate: new Date(post.postedAt),
        authorUsername: username,
        hasMediaContent: (post.image || []).length > 0,
      }
    })

    return Ok(postsPayload)
  }
  public async getComments(username: string): Promise<Result<SenderCommentPayload[], Error>> {
    const comments = await this.servicePort.linkedinService.getProfileComments(username)
    if (!comments.success) {
      return Err(new Error(comments.message))
    }
    const commentsData = comments.data
    const commentsPayload: SenderCommentPayload[] = (commentsData || []).map(
      (comment, index) => ({
        id: index,
        authorUsername: username,
        commentedContent: (comment.highlightedComments || []).join(' '),
        commentedInPublicationUrl: comment.postUrl,
        commentDate: new Date(comment.postedAt),
      }),
    )

    return Ok(commentsPayload)
  }
  public async getReactions(
    username: string,
  ): Promise<Result<ReceiverReactionPayload[], Error>> {
    const reactions = await this.servicePort.linkedinService.getProfileReactions(username)
    if (!reactions.success) {
      return Err(new Error(reactions.message))
    }
    const reactionsData = reactions.data?.items || []
    const reactionsPayload: ReceiverReactionPayload[] = (reactionsData || []).map(
      (reaction, index) => ({
        id: index,
        reactionByUsername: username,
        reactedToContent: reaction.text,
        reaction: reaction.action,
      }),
    )

    return Ok(reactionsPayload)
  }
  public async askToAI(
    prompt: string,
    jsonsAsAttachment: string[],
  ): Promise<Result<string, Error>> {
    try {
      const response = await this.servicePort.openaiService.sendMessage({
        prompt,
        jsonInputs: jsonsAsAttachment,
      })
      return Ok(response)
    } catch (err) {
      return Err(err as Error)
    }
  }
}
