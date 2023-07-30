import CheckinsRepository from '@/repositories/check-ins-repository'

interface GetUserMetricsRequest {
  userId: string
}

interface GetUserMetricsResponse {
  checkInsCount: number
}

export default class GetUserMetricsUseCase {
  constructor(private checkinsRepository: CheckinsRepository) {}

  execute = async (
    data: GetUserMetricsRequest,
  ): Promise<GetUserMetricsResponse> => {
    const checkInsCount = await this.checkinsRepository.countByUserId(
      data.userId,
    )

    return { checkInsCount }
  }
}
