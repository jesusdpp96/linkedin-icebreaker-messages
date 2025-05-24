// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class BaseError<T = Record<string, any>> extends Error {
  public readonly timestamp: Date
  public readonly errorId: string

  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
    public readonly metadata: T,
    public readonly cause?: Error,
  ) {
    super(message)
    this.name = this.constructor.name
    this.timestamp = new Date()
    this.errorId = this.generateErrorId()

    // Preservar el stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }

  private generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
  }

  public toJSON() {
    return {
      errorId: this.errorId,
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      timestamp: this.timestamp.toISOString(),
      metadata: this.metadata,
      cause: this.cause?.message,
      stack: this.stack,
    }
  }
}
