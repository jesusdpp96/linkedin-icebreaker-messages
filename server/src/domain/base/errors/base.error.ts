export interface BaseErrorAsJSON {
  errorId: string
  name: string
  message: string
  code: string
  statusCode: number
  timestamp: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: Record<string, any>
  path: string[]
  additionalErrors: BaseErrorAsJSON[]
  cause?: string
  stack?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class BaseError<T extends Record<string, any> = Record<string, any>> extends Error {
  public readonly timestamp: Date
  public readonly errorId: string
  public readonly path: string[] = []
  public readonly additionalErrors: BaseError[] = []
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

  public addContext(instance: string, method: string): void {
    this.path.push(instance, method)
  }

  public addAdditionalError(error: BaseError): void {
    this.additionalErrors.push(error)
  }

  public toJSON(): BaseErrorAsJSON {
    return {
      errorId: this.errorId,
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      timestamp: this.timestamp.toISOString(),
      metadata: this.metadata,
      path: this.path,
      additionalErrors: this.additionalErrors.map(error => error.toJSON()),
      cause: this.cause?.message,
      stack: this.stack,
    }
  }
}
