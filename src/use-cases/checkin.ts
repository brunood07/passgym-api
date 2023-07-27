import CheckinsRepository from '@/repositories/check-ins-repository'
import GymsRepository from '@/repositories/gyms-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins'

interface CheckinUserCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}
interface CheckinUserCaseResponse {
  checkin: CheckIn
}

const MAX_DISTANCE_IN_KILOMETER = 0.1

export default class CheckinUseCase {
  constructor(
    private checkinsRepository: CheckinsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  execute = async (
    data: CheckinUserCaseRequest,
  ): Promise<CheckinUserCaseResponse> => {
    const { gymId, userId, userLatitude, userLongitude } = data

    const gym = await this.gymsRepository.findById(gymId)
    if (!gym) throw new ResourceNotFoundError()

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    if (distance > MAX_DISTANCE_IN_KILOMETER) throw new MaxDistanceError()

    const chackinOnSameDay = await this.checkinsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (chackinOnSameDay) throw new MaxNumberOfCheckInsError()
    const checkin = await this.checkinsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkin }
  }
}
