import { Gym } from '@prisma/client'

export default interface GymsRepository {
  findById(id: string): Promise<Gym | null>
}
