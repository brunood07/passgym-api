import GymsRepository from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface SearchGymUseCaseRequest {
  query: string
  page: number
}

interface SearchGymUseCaseResponse {
  gyms: Gym[]
}

export default class SearchGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  execute = async (
    data: SearchGymUseCaseRequest,
  ): Promise<SearchGymUseCaseResponse> => {
    const { query, page } = data
    const gyms = await this.gymsRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
