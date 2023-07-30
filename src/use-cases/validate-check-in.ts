import CheckinsRepository from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import dayjs from 'dayjs'
import { LateCheckinValidationError } from './errors/late-check-in-validation-error'

interface ValidateCheckinUseCaseRequest {
  checkinId: string
}
interface ValidateCheckinUseCaseResponse {
  checkin: CheckIn
}

export default class ValidateCheckinUseCase {
  constructor(private checkinsRepository: CheckinsRepository) {}

  execute = async (
    data: ValidateCheckinUseCaseRequest,
  ): Promise<ValidateCheckinUseCaseResponse> => {
    const { checkinId } = data
    const checkin = await this.checkinsRepository.findById(checkinId)

    if (!checkin) throw new ResourceNotFoundError()

    const distanceInMinutesFromCheckinCreation = dayjs(new Date()).diff(
      checkin.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckinCreation > 20) {
      throw new LateCheckinValidationError()
    }

    checkin.validated_at = new Date()

    await this.checkinsRepository.save(checkin)

    return {
      checkin,
    }
  }
}
