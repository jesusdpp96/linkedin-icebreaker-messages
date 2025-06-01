import type {
  PostPayload,
  ProfilePayload,
  ReceiverReactionPayload,
  SenderCommentPayload,
} from '@domain'
import type { ServiceDriverPort } from '../../use-case/adapters/service'
import type { ServicePort } from './service.port'

export class Driver implements ServiceDriverPort {
  private postsCounter = 0
  constructor(private servicePort: ServicePort) {
    // Empty
  }
  public async getProfile(url: string): Promise<ProfilePayload> {
    const profileData = await this.servicePort.linkedinService.getProfileDataByUrl(url)
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

    return profile
  }
  public async getPosts(username: string): Promise<PostPayload[]> {
    const posts = await this.servicePort.linkedinService.getProfilePosts(username)
    const postsData = posts.data
    const postsPayload: PostPayload[] = (postsData || [])
      .map(post => {
        this.postsCounter++
        return {
          id: this.postsCounter,
          postedContent: post.text || '',
          publicationUrl: post.postUrl,
          postedDate: post.postedAt,
          authorUsername: username,
          hasMediaContent: (post.image || []).length > 0,
        }
      })
      .filter(elem => elem.postedContent.length > 0)

    return postsPayload
  }
  public async getComments(username: string): Promise<SenderCommentPayload[]> {
    const comments = await this.servicePort.linkedinService.getProfileComments(username)
    const commentsData = comments.data
    const commentsPayload: SenderCommentPayload[] = (commentsData || [])
      .map((comment, index) => ({
        id: index + 1,
        authorUsername: username,
        commentedContent: (comment.highlightedComments || []).join(' '),
        commentedInPublicationUrl: comment.postUrl,
        commentDate: comment.postedAt,
      }))
      .filter(elem => elem.commentedContent.length > 0)
    return commentsPayload
  }
  public async getReactions(username: string): Promise<ReceiverReactionPayload[]> {
    const reactions = await this.servicePort.linkedinService.getProfileReactions(username)
    const reactionsData = reactions.data?.items || []
    const reactionsPayload: ReceiverReactionPayload[] = (reactionsData || [])
      .map((reaction, index) => ({
        id: index + 1,
        reactionByUsername: username,
        reactedToContent: reaction.text || '',
        reaction: reaction.action,
      }))
      .filter(elem => elem.reactedToContent.length > 0)

    return reactionsPayload
  }
  public async askToAI(prompt: string, jsonsAsAttachment: string[]): Promise<string> {
    const response = await this.servicePort.openaiService.getStructuredResponse({
      prompt,
      jsonInputs: jsonsAsAttachment,
    })
    return response
  }
}
