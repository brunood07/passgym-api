import CheckinsRepository from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface FetchUserCheckInsHistoryRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryResponse {
  checkIns: CheckIn[]
}

export default class FetchUserCheckInsHistory {
  constructor(private checkinsRepository: CheckinsRepository) {}

  execute = async (
    data: FetchUserCheckInsHistoryRequest,
  ): Promise<FetchUserCheckInsHistoryResponse> => {
    const { userId, page } = data
    const checkIns = await this.checkinsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
