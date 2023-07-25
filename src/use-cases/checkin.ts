import CheckinsRepository from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface CheckinUserCaseRequest {
  userId: string
  gymId: string
}
interface CheckinUserCaseResponse {
  checkin: CheckIn
}

export default class CheckinUseCase {
  constructor(private checkinsRepository: CheckinsRepository) {}

  execute = async (
    data: CheckinUserCaseRequest,
  ): Promise<CheckinUserCaseResponse> => {
    const { gymId, userId } = data
    const checkin = await this.checkinsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkin }
  }
}
