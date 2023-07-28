import { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import CheckinsRepository from '../check-ins-repository'

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

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkinOnSameDate = this.checkIns.find((checkin) => {
      const checkInDate = dayjs(checkin.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkin.user_id === userId && isOnSameDate
    })

    if (!checkinOnSameDate) return null

    return checkinOnSameDate
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    return this.checkIns
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }
}
