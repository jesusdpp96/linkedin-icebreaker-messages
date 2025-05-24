import type { ZodIssue } from 'zod'
import { BaseError } from './base.error'

interface Metadata {
  issues: ZodIssue[]
}

export class RuleValidationError extends BaseError<Metadata> {
  /**
   *
   * @param artifactName Name of entity or value-object
   * @param metadata
   */
  constructor(artifactName: string, public readonly metadata: Metadata) {
    super(`Rule Validation error in ${artifactName}`, artifactName, 400, metadata)
  }
}
