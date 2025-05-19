/**
 * A singleton class that tracks and limits the number of requests made to a specific route per hour.
 *
 * This class is designed to enforce a maximum number of requests per hour for a given route.
 * It uses an array of timestamps to track request times.
 */
export class RequestCounter {
  private static instance: RequestCounter
  private route: string
  private maxRequests: number
  private requestTimestamps: number[]

  private constructor(route: string, maxRequests: number) {
    this.route = route
    this.maxRequests = maxRequests
    this.requestTimestamps = []
  }

  public static getInstance(route: string, maxRequests = 10): RequestCounter {
    if (!RequestCounter.instance) {
      RequestCounter.instance = new RequestCounter(route, maxRequests)
    }
    return RequestCounter.instance
  }

  public handleRequest(): void {
    const now = Date.now()
    this.requestTimestamps.push(now)
  }

  public canMakeRequest(): boolean {
    const now = Date.now()
    const oneHourAgo = now - 60 * 60 * 1000

    // Remove timestamps older than one hour
    this.requestTimestamps = this.requestTimestamps.filter(timestamp => timestamp > oneHourAgo)

    if (this.requestTimestamps.length >= this.maxRequests) {
      return false // Request limit reached
    }

    return true // Request allowed
  }

  public resetCounter(): void {
    this.requestTimestamps = []
  }

  public getRoute(): string {
    return this.route
  }

  public getMaxRequests(): number {
    return this.maxRequests
  }
}
