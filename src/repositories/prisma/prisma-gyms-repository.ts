import { Gym, Prisma } from '@prisma/client'
import GymsRepository, { FindManyNearbyParams } from '../gyms-repository'
import { prisma } from '@/lib/prisma'

export default class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: { id },
    })

    return gym
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    throw new Error('Method not implemented.')
  }

  async findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
    throw new Error('Method not implemented.')
  }
}
