import { Gym, Prisma } from '@prisma/client'
import GymsRepository, { FindManyNearbyParams } from '../gyms-repository'
import { randomUUID } from 'crypto'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export default class GymsRepositoryInMemory implements GymsRepository {
  public gyms: Gym[] = []

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.gyms.push(gym)

    return gym
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = this.gyms.find((item) => item.id === id)

    if (!gym) return null

    return gym
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return await this.gyms
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = await this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      )

      return distance < 10
    })

    return gyms
  }
}
