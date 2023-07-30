import GymsRepository from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface FetchNearbyGymsRequest {
  userLatitude: number
  userLongitude: number
}
interface FetchNearbyGymsResponse {
  gyms: Gym[]
}

export default class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  execute = async (
    data: FetchNearbyGymsRequest,
  ): Promise<FetchNearbyGymsResponse> => {
    const { userLatitude, userLongitude } = data
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
