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
      // Convertimos todos los objetos a primitivos para facilitar su serialización
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
        // Acortamos los links de las publicaciones
        postPrimitive.publicationUrl = this.shortenLink(postPrimitive.publicationUrl)
        return postPrimitive
      })
      const receiverPostsPrimitive = receiverPosts.map(post => {
        const postPrimitive = post.toPrimitive()
        // Acortamos los links de las publicaciones
        postPrimitive.publicationUrl = this.shortenLink(postPrimitive.publicationUrl)
        return postPrimitive
      })
      const senderCommentsPrimitive = senderComments.map(comment => {
        const commentPrimitive = comment.toPrimitive()
        // Acortamos los links de los comentarios
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
      // Preparamos los datos para adjuntar al prompt
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

      // Construimos un prompt detallado para la IA
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

      // Enviamos el prompt a la IA con todos los datos adjuntos
      const aiResponseResult = await this.service.askToAI(prompt, dataAttachments)

      if (aiResponseResult.err) {
        this.presenter.showAIError(aiResponseResult.val)
        return
      }

      const aiResponse = aiResponseResult.val

      // Parseamos la respuesta para obtener los mensajes generados
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let icebreakers: any[] = []
      const icebreakersInstances: IcebreakerMessage[] = []
      try {
        icebreakers = JSON.parse(aiResponse)

        // Validamos que tengamos exactamente 3 mensajes
        if (!Array.isArray(icebreakers) || icebreakers.length !== 3) {
          throw new Error('La respuesta de la IA no contiene exactamente 3 mensajes')
        }

        // Validamos la estructura de cada mensaje
        for (let index = 0; index < icebreakers.length; index++) {
          const message = icebreakers[index]
          if (message?.sourcePosts) {
            // Desacortamos los links de las publicaciones
            message.sourcePosts = message.sourcePosts.map((link: string) =>
              this.getShortedLink(link),
            )
          }
          const icebreakerMessage = IcebreakerMessage.of(message)
          if (icebreakerMessage.err) {
            throw new Error(`El mensaje ${index + 1} no tiene la estructura esperada`)
          }
          icebreakersInstances.push(icebreakerMessage.val)
        }
      } catch (error) {
        // Si hay problemas con el formato de la respuesta, intentamos con un prompt más explícito
        const fixPromptStr = fixPrompt()

        const fixResult = await this.service.askToAI(fixPromptStr, [aiResponse])

        if (fixResult.err) {
          this.presenter.showAIError(fixResult.val)
          return
        }

        try {
          icebreakers = JSON.parse(fixResult.val)

          if (!Array.isArray(icebreakers) || icebreakers.length !== 3) {
            throw new Error('La respuesta de la IA no contiene exactamente 3 mensajes')
          }

          for (let index = 0; index < icebreakers.length; index++) {
            const message = icebreakers[index]
            if (message?.sourcePosts) {
              // Desacortamos los links de las publicaciones
              message.sourcePosts = message.sourcePosts.map((link: string) =>
                this.getShortedLink(link),
              )
            }
            const icebreakerMessage = IcebreakerMessage.of(message)
            if (icebreakerMessage.err) {
              throw new Error(`El mensaje ${index + 1} no tiene la estructura esperada`)
            }
            icebreakersInstances.push(icebreakerMessage.val)
          }
        } catch (error) {
          this.presenter.showAIError(
            new Error('No se pudo obtener una respuesta válida de la IA'),
          )
          return
        }
      }

      // Mostramos los resultados al usuario
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
