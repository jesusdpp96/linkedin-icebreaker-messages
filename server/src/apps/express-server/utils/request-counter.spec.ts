import { RequestCounter } from './request-counter'

describe('RequestCounter', () => {
  const route = '/test-route'
  const maxRequests = 5

  beforeEach(() => {
    // Reset the singleton instance before each test
    ;(RequestCounter as any).instance = null
  })

  it('should create a singleton instance', () => {
    const instance1 = RequestCounter.getInstance(route, maxRequests)
    const instance2 = RequestCounter.getInstance(route, maxRequests)
    expect(instance1).toBe(instance2)
  })

  it('should allow requests within the limit', () => {
    const requestCounter = RequestCounter.getInstance(route, maxRequests)
    for (let i = 0; i < maxRequests; i++) {
      expect(requestCounter.canMakeRequest()).toBe(true)
      requestCounter.handleRequest()
    }
  })

  it('should block requests exceeding the limit', () => {
    const requestCounter = RequestCounter.getInstance(route, maxRequests)
    for (let i = 0; i < maxRequests; i++) {
      requestCounter.handleRequest()
    }
    expect(requestCounter.canMakeRequest()).toBe(false)
  })

  it('should reset the counter', () => {
    const requestCounter = RequestCounter.getInstance(route, maxRequests)
    for (let i = 0; i < maxRequests; i++) {
      requestCounter.handleRequest()
    }
    requestCounter.resetCounter()
    expect(requestCounter.canMakeRequest()).toBe(true)
  })

  it('should remove timestamps older than one hour', () => {
    const requestCounter = RequestCounter.getInstance(route, maxRequests)
    const now = Date.now() // Correctly initialize 'now'

    // Simulate old requests
    ;(requestCounter as any).requestTimestamps = [
      now - 2 * 60 * 60 * 1000, // 2 hours ago
      now - 90 * 60 * 1000, // 1.5 hours ago
      now - 30 * 60 * 1000, // 30 minutes ago
    ]

    expect(requestCounter.canMakeRequest()).toBe(true)
    requestCounter.handleRequest()
    expect((requestCounter as any).requestTimestamps.length).toBe(2) // Only recent timestamps remain
  })

  it('should return the correct route and maxRequests', () => {
    const requestCounter = RequestCounter.getInstance(route, maxRequests)
    expect(requestCounter.getRoute()).toBe(route)
    expect(requestCounter.getMaxRequests()).toBe(maxRequests)
  })
})
