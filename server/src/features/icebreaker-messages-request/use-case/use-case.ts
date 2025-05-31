import type { ErrorsCollection, IcebreakerMessageAiResponse } from '@domain'
import { IcebreakerMessage, PromptBuilder } from '@domain'
import type { InputDto } from './input.dto'
import type { ServiceAdapter } from './adapters/service'
import type { RepositoryAdapter } from './adapters/repository'
import type { PresenterAdapter } from './adapters/presenter'

export class UseCase {
  constructor(
    private service: ServiceAdapter,
    private repository: RepositoryAdapter,
    private presenter: PresenterAdapter,
  ) {
    //empty
  }
  /**
   * Execute use case
   * @param input
   */
  async execute(input: InputDto): Promise<void> {
    try {
      /**
       * Build Request
       */
      const request = this.service.getRequest(input)
      /**
       * Getting linkedin data
       */
      const {
        senderProfile,
        senderPosts,
        senderComments,
        receiverProfile,
        receiverPosts,
        receiverReactions,
      } = await this.service.getLinkedinData(request)
      /**
       * Getting messages templates
       */
      const messagesTemplates = await this.repository.getMessagesTemplate()
      /**
       * Generating prompts
       *
       * PromptBuilder implements two strategies:
       * - `OneShot`: Generates a single prompt to get 3 messages
       * - `ManyShots`: One prompt for each message, generating 3 prompts in total
       *
       * Strategy is selected based on the number of sender posts and comments.
       * Is posible set up the strategy by passing a `strategy` parameter in generatePrompts() method.
       */
      const promptBuilder = PromptBuilder.create({
        senderProfile,
        senderPosts,
        senderComments,
        receiverProfile,
        receiverPosts,
        receiverReactions,
        problemDescription: request.problemDescription,
        solutionDescription: request.solutionDescription,
        messagesTemplates,
      })
      const prompts = promptBuilder.generatePrompts(3)
      /**
       * Generating messages by AI
       * The service will use the prompts to generate messages using AI.
       */
      const messagesByAi: IcebreakerMessageAiResponse[] = await this.service.generateMessages(
        prompts,
      )
      /**
       * Transforming messages by AI into IcebreakerMessage entities
       * Each message will be enriched with sender and receiver profile information.
       */
      const messages = messagesByAi.map(message =>
        IcebreakerMessage.create({
          message: message.message,
          templateTitle: message.templateTitle,
          templateCategory: message.templateCategory,
          instruction: message.instruction,
          sourcePosts: message.sourcePosts,
          receiverName: `${receiverProfile.firstName} ${receiverProfile.lastName}`,
          receiverProfilePicture: receiverProfile.profilePicture,
          receiverHeadline: receiverProfile.headline,
          senderName: `${senderProfile.firstName} ${senderProfile.lastName}`,
          senderProfilePicture: senderProfile.profilePicture,
          senderHeadline: senderProfile.headline,
        }),
      )
      /**
       * Reporting success
       * The presenter will handle the success response, which can be a JSON response or any other format.
       */
      this.presenter.reportSuccess(messages)
    } catch (error) {
      /**
       * Reporting error
       */
      this.presenter.reportError(error as ErrorsCollection)
    }
  }
}
