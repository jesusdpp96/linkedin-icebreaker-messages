import type { PromptBuilder } from '../definition'
import { ManyShotStrategy } from './many-shots-strategy'
import { OneShotStrategy } from './one-shot-strategy'
import type { PromptShot, PromptStrategy } from './prompt-strategy'

export class PromptContext {
  private readonly MIN_CONTENT_TO_EACH_PROMPT = 3
  private strategy!: PromptStrategy

  constructor(private builder: PromptBuilder, private numberOfMessages = 3) {
    const senderContentNumber =
      this.builder.senderPosts.length + this.builder.senderComments.length
    if (senderContentNumber < this.MIN_CONTENT_TO_EACH_PROMPT * this.numberOfMessages) {
      this.setStrategy(new OneShotStrategy(this.builder))
    } else {
      this.setStrategy(new ManyShotStrategy(this.builder, this.MIN_CONTENT_TO_EACH_PROMPT))
    }
  }

  setStrategy(strategy: OneShotStrategy | ManyShotStrategy): void {
    this.strategy = strategy
  }

  generatePrompts(numberOfMessages: number): PromptShot[] {
    return this.strategy.generatePrompts(numberOfMessages)
  }
}
