import { CheckIn, Prisma } from '@prisma/client'

export default interface CheckinsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  findById(checkinId: string): Promise<CheckIn | null>
  countByUserId(userId: string): Promise<number>
  save(checkin: CheckIn): Promise<CheckIn>
}
