import PrismaCheckinsRepository from '@/repositories/prisma/prisma-check-ins-repository'
import FetchUserCheckInsHistory from '../fetch-user-check-ins-history'

export function makeCFetchUserCheckInsHistoryUseCase() {
  const checkinsRepository = new PrismaCheckinsRepository()
  const fetchUserCheckInHistoryUseCase = new FetchUserCheckInsHistory(
    checkinsRepository,
  )

  return fetchUserCheckInHistoryUseCase
}
