import { IcebreakerMessage } from '@domain'
import type { ServicePort } from './service.port'
import type { InputDto } from './input.dto'
import type { RepositoryPort } from './repository.port'
import type { PresenterPort } from './presenter.port'
import { firstPrompt, fixPrompt } from './prompts'

export class UseCase {
  private shortedLinks: Map<string, string> = new Map()
  private shortedLinksCount = 0
  constructor(
    private service: ServicePort,
    private repository: RepositoryPort,
    private presenter: PresenterPort,
  ) {
    //empty
  }
  /**
   * Execute use case
   * @param input
   */
  async execute(input: InputDto): Promise<void> {
    /**
     * Build Request
     */
    const requestResult = this.service.getRequest(input)
    if (requestResult.err) {
      this.presenter.showRequestError(requestResult.val)
      return
    }
    const request = requestResult.val
    /**
     * Getting sender and receiver profiles
     */
    const senderProfilePromise = this.service.getLinkedinProfile(request.senderLinkedinUrl)
    const receiverProfilePromise = this.service.getLinkedinProfile(request.receiverLinkedinUrl)
    const [senderProfileResult, receiverProfileResult] = await Promise.all([
      senderProfilePromise,
      receiverProfilePromise,
    ])
    if (senderProfileResult.err) {
      this.presenter.showSenderProfileError(senderProfileResult.val)
      return
    }
    if (receiverProfileResult.err) {
      this.presenter.showReceiverProfileError(receiverProfileResult.val)
      return
    }
    const senderProfile = senderProfileResult.val
    const receiverProfile = receiverProfileResult.val
    /**
     * Getting:
     *  - sender posts
     *  - receiver posts
     *  - sender comments
     *  - receiver reactions
     */
    const senderPostsPromise = this.service.getLinkedinPosts(senderProfile)
    const receiverPostsPromise = this.service.getLinkedinPosts(receiverProfile)
    const senderCommentsPromise = this.service.getLinkedinSenderComments(senderProfile)
    const receiverReactionsPromise = this.service.getLinkedinReceiverReactions(receiverProfile)
    const [
      senderPostsResult,
      receiverPostsResult,
      senderCommentsResult,
      receiverReactionsResult,
    ] = await Promise.all([
      senderPostsPromise,
      receiverPostsPromise,
      senderCommentsPromise,
      receiverReactionsPromise,
    ])
    if (senderPostsResult.err) {
      this.presenter.showSenderPostsError(senderPostsResult.val)
      return
    }
    if (receiverPostsResult.err) {
      this.presenter.showReceiverPostsError(receiverPostsResult.val)
      return
    }
    if (senderCommentsResult.err) {
      this.presenter.showSenderCommentsError(senderCommentsResult.val)
      return
    }
    if (receiverReactionsResult.err) {
      this.presenter.showReceiverReactionsError(receiverReactionsResult.val)
      return
    }
    /**
     * Getting messages templates
     */
    const messagesTemplatesResult = await this.repository.getMessagesTemplate()
    if (messagesTemplatesResult.err) {
      this.presenter.showMessagesTemplateError(messagesTemplatesResult.val)
      return
    }
    /**
     * Ask to AI
     */
    const messagesTemplates = messagesTemplatesResult.val
    const problem = request.problemDescription
    const solution = request.solutionDescription
    const senderPosts = senderPostsResult.val
    const receiverPosts = receiverPostsResult.val
    const senderComments = senderCommentsResult.val
    const receiverReactions = receiverReactionsResult.val

    try {
      // Convert all objects to primitives to facilitate serialization
      const senderProfilePrimitive = senderProfile.toPrimitive()
      const receiverProfilePrimitive = receiverProfile.toPrimitive()
      senderProfilePrimitive.profilePicture = this.shortenLink(
        senderProfilePrimitive.profilePicture,
      )
      receiverProfilePrimitive.profilePicture = this.shortenLink(
        receiverProfilePrimitive.profilePicture,
      )
      const senderPostsPrimitive = senderPosts.map(post => {
        const postPrimitive = post.toPrimitive()
        // Shorten the links of the posts
        postPrimitive.publicationUrl = this.shortenLink(postPrimitive.publicationUrl)
        return postPrimitive
      })
      const receiverPostsPrimitive = receiverPosts.map(post => {
        const postPrimitive = post.toPrimitive()
        // Shorten the links of the posts
        postPrimitive.publicationUrl = this.shortenLink(postPrimitive.publicationUrl)
        return postPrimitive
      })
      const senderCommentsPrimitive = senderComments.map(comment => {
        const commentPrimitive = comment.toPrimitive()
        // Shorten the links of the comments
        commentPrimitive.commentedInPublicationUrl = this.shortenLink(
          commentPrimitive.commentedInPublicationUrl,
        )
        return commentPrimitive
      })
      const receiverReactionsPrimitive = receiverReactions.map(reaction =>
        reaction.toPrimitive(),
      )
      const messagesTemplatesPrimitive = messagesTemplates.map(template =>
        template.toPrimitive(),
      )
      // Prepare the data to attach to the prompt
      const dataAttachments = [
        JSON.stringify({
          senderProfile: senderProfilePrimitive,
          receiverProfile: receiverProfilePrimitive,
          problem,
          solution,
          messagesTemplates: messagesTemplatesPrimitive,
        }),
        JSON.stringify({
          senderPosts: senderPostsPrimitive,
          receiverPosts: receiverPostsPrimitive,
          senderComments: senderCommentsPrimitive,
          receiverReactions: receiverReactionsPrimitive,
        }),
      ]

      // Build a detailed prompt for the AI
      const prompt = firstPrompt(
        senderProfilePrimitive.firstName,
        senderProfilePrimitive.lastName,
        senderProfilePrimitive.headline,
        receiverProfilePrimitive.firstName,
        receiverProfilePrimitive.lastName,
        receiverProfilePrimitive.headline,
        problem,
        solution,
      )

      // Send the prompt to the AI with all the attached data
      const aiResponseResult = await this.service.askToAI(prompt, dataAttachments)

      if (aiResponseResult.err) {
        this.presenter.showAIError(aiResponseResult.val)
        return
      }

      const aiResponse = aiResponseResult.val

      // Parse the response to obtain the generated messages
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let icebreakers: any[] = []
      const icebreakersInstances: IcebreakerMessage[] = []
      try {
        icebreakers = JSON.parse(aiResponse)

        // Validate that we have exactly 3 messages
        if (!Array.isArray(icebreakers) || icebreakers.length !== 3) {
          throw new Error('The AI response does not contain exactly 3 messages')
        }

        // Validate the structure of each message
        for (let index = 0; index < icebreakers.length; index++) {
          const message = icebreakers[index]
          if (message?.sourcePosts) {
            // Unshorten the links of the posts
            message.sourcePosts = message.sourcePosts.map((link: string) =>
              this.getShortedLink(link),
            )
          }
          if (message) {
            message.receiverName =
              `${receiverProfilePrimitive.firstName} ${receiverProfilePrimitive.lastName}`.trim()
            message.receiverProfilePicture = this.getShortedLink(
              receiverProfilePrimitive.profilePicture,
            )
            message.receiverHeadline = receiverProfilePrimitive.headline
            message.senderName =
              `${senderProfilePrimitive.firstName} ${senderProfilePrimitive.lastName}`.trim()
            message.senderProfilePicture = this.getShortedLink(
              senderProfilePrimitive.profilePicture,
            )
            message.senderHeadline = senderProfilePrimitive.headline
          }
          const icebreakerMessage = IcebreakerMessage.of(message)
          if (icebreakerMessage.err) {
            throw new Error(`Message ${index + 1} does not have the expected structure`)
          }
          icebreakersInstances.push(icebreakerMessage.val)
        }
      } catch (error) {
        // If there are issues with the response format, try with a more explicit prompt
        const fixPromptStr = fixPrompt()

        const fixResult = await this.service.askToAI(fixPromptStr, [aiResponse])

        if (fixResult.err) {
          this.presenter.showAIError(fixResult.val)
          return
        }

        try {
          icebreakers = JSON.parse(fixResult.val)

          if (!Array.isArray(icebreakers) || icebreakers.length !== 3) {
            throw new Error('The AI response does not contain exactly 3 messages')
          }

          for (let index = 0; index < icebreakers.length; index++) {
            const message = icebreakers[index]
            if (message?.sourcePosts) {
              // Unshorten the links of the posts
              message.sourcePosts = message.sourcePosts.map((link: string) =>
                this.getShortedLink(link),
              )
            }
            if (message) {
              message.receiverName =
                `${receiverProfilePrimitive.firstName} ${receiverProfilePrimitive.lastName}`.trim()
              message.receiverProfilePicture = this.getShortedLink(
                receiverProfilePrimitive.profilePicture,
              )
              message.receiverHeadline = receiverProfilePrimitive.headline
              message.senderName =
                `${senderProfilePrimitive.firstName} ${senderProfilePrimitive.lastName}`.trim()
              message.senderProfilePicture = this.getShortedLink(
                senderProfilePrimitive.profilePicture,
              )
              message.senderHeadline = senderProfilePrimitive.headline
            }
            const icebreakerMessage = IcebreakerMessage.of(message)
            if (icebreakerMessage.err) {
              throw new Error(`Message ${index + 1} does not have the expected structure`)
            }
            icebreakersInstances.push(icebreakerMessage.val)
          }
        } catch (error) {
          this.presenter.showAIError(new Error('Could not obtain a valid response from the AI'))
          return
        }
      }

      // Show the results to the user
      this.presenter.showIcebreakerMessages(icebreakersInstances)
    } catch (error) {
      this.presenter.showUnexpectedError(error as Error)
    }
  }
  /**
   * Shorten link
   * @param link
   * @returns shorted link
   */
  private shortenLink(link: string): string {
    const shortedLink = `https://s.link/${this.shortedLinksCount}`
    this.shortedLinks.set(shortedLink, link)
    this.shortedLinksCount++
    return shortedLink
  }
  /**
   * Get shorted link
   * @param shortedLink
   * @returns original link
   */
  private getShortedLink(shortedLink: string): string {
    return this.shortedLinks.get(shortedLink) ?? shortedLink
  }
}
