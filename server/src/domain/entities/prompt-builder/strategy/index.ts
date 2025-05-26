import type { OneShotStrategy } from './one-shot-strategy'
import type { ManyShotStrategy } from './many-shots-strategy'
export { PromptContext } from './prompt-context'
export { OneShotStrategy } from './one-shot-strategy'
export { ManyShotStrategy } from './many-shots-strategy'

export type Strategy = OneShotStrategy | ManyShotStrategy
