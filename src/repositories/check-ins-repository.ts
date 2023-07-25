import { CheckIn, Prisma } from '@prisma/client'

export default interface CheckinsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
