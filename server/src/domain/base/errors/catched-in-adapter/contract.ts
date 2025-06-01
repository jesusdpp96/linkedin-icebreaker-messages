import type { ErrorsCollection } from '../collection'

export interface ErrorStrategy {
  adjust(): ErrorsCollection
}
