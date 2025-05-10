import { ApiClient } from './api-client'
import type {
  LinkedInApiConfig,
  ProfileData,
  ProfilePostsResponse,
  ProfileReactionsResponse,
  ProfileCommentsResponse,
  MethodCreditUsage,
  PlanInfo,
  UsageReport,
} from './types'

export class LinkedInService {
  private client: ApiClient
  private creditUsage: Map<string, MethodCreditUsage>
  private totalCreditsUsed: number
  private reportTimeoutId: NodeJS.Timeout | null
  private plans: PlanInfo[]

  constructor(config: LinkedInApiConfig) {
    this.client = new ApiClient(config)
    this.creditUsage = new Map<string, MethodCreditUsage>()
    this.totalCreditsUsed = 0
    this.reportTimeoutId = null

    // Definir los planes disponibles
    this.plans = [
      { name: 'Plan gratuito', credits: 50, cost: 0 },
      { name: 'Plan PRO', credits: 50000, cost: 175 },
      { name: 'Plan ultra', credits: 100000, cost: 300 },
      { name: 'Plan Mega', credits: 200000, cost: 500 },
    ]

    // Inicializar el uso de créditos para cada método
    this.initializeMethodCredits()
  }

  private initializeMethodCredits(): void {
    const methods = [
      'getProfileDataByUrl',
      'getProfilePosts',
      'getProfileReactions',
      'getProfileComments',
    ]

    methods.forEach(method => {
      this.creditUsage.set(method, {
        methodName: method,
        creditsUsed: 0,
        callCount: 0,
      })
    })
  }

  private trackCreditUsage(methodName: string, success: boolean): void {
    if (!success) return // Solo contamos créditos para llamadas exitosas

    // Incrementar el contador para el método específico
    const methodUsage = this.creditUsage.get(methodName)
    if (methodUsage) {
      methodUsage.creditsUsed += 1
      methodUsage.callCount += 1
      this.totalCreditsUsed += 1
    }

    // Cancelar el reporte anterior si existe
    if (this.reportTimeoutId) {
      clearTimeout(this.reportTimeoutId)
      this.reportTimeoutId = null
    }

    // Programar un nuevo reporte diferido
    this.reportTimeoutId = setTimeout(() => {
      this.printUsageReport()
    }, 10_000) // 10 segundos de retraso
  }

  private calculateCurrentPlan(): string {
    for (let i = this.plans.length - 1; i >= 0; i--) {
      if (this.totalCreditsUsed <= this.plans[i].credits) {
        return this.plans[i].name
      }
    }
    return this.plans[this.plans.length - 1].name // Si excede todos los planes, usa el más alto
  }

  private calculateCostByPlan(): { free: number; pro: number; ultra: number; mega: number } {
    return {
      free: this.calculateCostForPlan(0),
      pro: this.calculateCostForPlan(1),
      ultra: this.calculateCostForPlan(2),
      mega: this.calculateCostForPlan(3),
    }
  }

  private calculateCostForPlan(planIndex: number): number {
    const plan = this.plans[planIndex]
    const costPerCredit = plan.cost / plan.credits
    return parseFloat((this.totalCreditsUsed * costPerCredit).toFixed(4))
  }

  private generateUsageReport(): UsageReport {
    const methodsUsage: MethodCreditUsage[] = []
    this.creditUsage.forEach(usage => {
      methodsUsage.push({
        methodName: usage.methodName,
        creditsUsed: usage.creditsUsed,
        callCount: usage.callCount,
      })
    })

    return {
      totalCreditsUsed: this.totalCreditsUsed,
      methodsUsage,
      costByPlan: this.calculateCostByPlan(),
      currentPlan: this.calculateCurrentPlan(),
      timestamp: new Date().toISOString(),
    }
  }

  private printUsageReport(): void {
    const report = this.generateUsageReport()
    console.log('\n\n\n===== API USAGE REPORT =====')
    console.log(`Total credits used: ${report.totalCreditsUsed}`)

    console.log('\nCredits by method:')
    report.methodsUsage.forEach(method => {
      console.log(
        `- ${method.methodName}: ${method.creditsUsed} credits (${method.callCount} calls)`,
      )
    })

    console.log('\nApproximate cost by plan:')
    console.log(`- Free plan (50 credits): $${report.costByPlan.free}`)
    console.log(`- PRO plan (50k credits): $${report.costByPlan.pro}`)
    console.log(`- Ultra plan (100k credits): $${report.costByPlan.ultra}`)
    console.log(`- Mega plan (200K credits): $${report.costByPlan.mega}`)

    console.log(`\nCurrent plan: ${report.currentPlan}`)
    console.log('=============================\n')
  }

  /**
   * Exporta el reporte de uso de la API en formato JSON
   * @returns Reporte de uso en formato JSON
   * @example
   * const reportJson = linkedInService.exportUsageReportAsJson();
   */
  exportUsageReportAsJson(): string {
    const report = this.generateUsageReport()
    return JSON.stringify(report, null, 2)
  }

  // Wrapper para ejecutar un método con seguimiento de créditos
  private async executeWithTracking<T>(
    methodName: string,
    operation: () => Promise<T>,
  ): Promise<T> {
    try {
      const result = await operation()
      this.trackCreditUsage(methodName, true)
      return result
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(`Error en ${methodName}:`, error)
      if (error.status === 429) {
        const newError = new Error('linkedin_api_rate_limit')
        throw newError
      }
      throw error
    }
  }

  /**
   * Retrieves LinkedIn profile data through the URL
   * @param url LinkedIn profile URL (must be encoded)
   * @returns Profile data
   * @example
   * const profileData = await linkedInService.getProfileDataByUrl('https%3A%2F%2Fwww.linkedin.com%2Fin%2Fadamselipsky%2F');
   */
  async getProfileDataByUrl(url: string): Promise<ProfileData> {
    if (!url) {
      throw new Error('URL is required')
    }

    return this.executeWithTracking('getProfileDataByUrl', () =>
      this.client.get<ProfileData>('/get-profile-data-by-url', { url }),
    )
  }

  /**
   * Retrieves posts from a LinkedIn profile
   * @param username Profile username
   * @param options Additional options such as start, paginationToken, and postedAt
   * @returns Profile posts
   * @example
   * const posts = await linkedInService.getProfilePosts('adamselipsky');
   * // With pagination
   * const morePosts = await linkedInService.getProfilePosts('adamselipsky', {
   *   start: '50',
   *   paginationToken: 'token-from-previous-call'
   * });
   */
  async getProfilePosts(
    username: string,
    options?: {
      start?: string
      paginationToken?: string
      postedAt?: string
    },
  ): Promise<ProfilePostsResponse> {
    if (!username) {
      throw new Error('Username is required')
    }

    const params = { username, ...options }
    return this.executeWithTracking('getProfilePosts', () =>
      this.client.get<ProfilePostsResponse>('/get-profile-posts', params),
    )
  }

  /**
   * Retrieves reactions from a LinkedIn profile
   * @param username Profile username
   * @param options Additional options such as start and paginationToken
   * @returns Profile reactions
   * @example
   * const reactions = await linkedInService.getProfileReactions('adamselipsky');
   */
  async getProfileReactions(
    username: string,
    options?: {
      start?: string
      paginationToken?: string
    },
  ): Promise<ProfileReactionsResponse> {
    if (!username) {
      throw new Error('Username is required')
    }

    const params = { username, ...options }
    return this.executeWithTracking('getProfileReactions', () =>
      this.client.get<ProfileReactionsResponse>('/get-profile-likes', params),
    )
  }

  /**
   * Retrieves comments from a LinkedIn profile
   * @param username Profile username
   * @returns Profile comments
   * @example
   * const comments = await linkedInService.getProfileComments('williamhgates');
   */
  async getProfileComments(username: string): Promise<ProfileCommentsResponse> {
    if (!username) {
      throw new Error('Username is required')
    }

    return this.executeWithTracking('getProfileComments', () =>
      this.client.get<ProfileCommentsResponse>('/get-profile-comments', { username }),
    )
  }
}
