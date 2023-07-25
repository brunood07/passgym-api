import { CheckIn, Prisma } from '@prisma/client'
import CheckinsRepository from './check-ins-repository'

export default class CheckinsRepositoryInMemory implements CheckinsRepository {
  public checkIns: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkin = {
      id: `id-${data.user_id}`,
      gym_id: data.gym_id,
      user_id: data.user_id,
      created_at: new Date(),
      validated_at: null,
    }

    this.checkIns.push(checkin)

    return checkin
  }
}
