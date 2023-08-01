import PrismaCheckinsRepository from '@/repositories/prisma/prisma-check-ins-repository'
import GetUserMetricsUseCase from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckinsRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository)

  return getUserMetricsUseCase
}
