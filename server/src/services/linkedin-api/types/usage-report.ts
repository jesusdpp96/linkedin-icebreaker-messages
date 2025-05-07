export interface PlanInfo {
  name: string
  credits: number
  cost: number
}

export interface MethodCreditUsage {
  methodName: string
  creditsUsed: number
  callCount: number
}

export interface UsageReport {
  totalCreditsUsed: number
  methodsUsage: MethodCreditUsage[]
  costByPlan: {
    free: number
    pro: number
    ultra: number
    mega: number
  }
  currentPlan: string
  timestamp: string
}
