import GymsRepository from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface CreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export default class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  execute = async (
    data: CreateGymUseCaseRequest,
  ): Promise<CreateGymUseCaseResponse> => {
    const { description, latitude, longitude, phone, title } = data
    const gym = await this.gymsRepository.create({
      description,
      latitude,
      longitude,
      phone,
      title,
    })

    return { gym }
  }
}
