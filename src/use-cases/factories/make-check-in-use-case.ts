import PrismaCheckinsRepository from '@/repositories/prisma/prisma-check-ins-repository'
import PrismaGymsRepository from '@/repositories/prisma/prisma-gyms-repository'
import CheckinUseCase from '../checkin'

export function makeCheckInUseCase() {
  const checkinsRepository = new PrismaCheckinsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const checkinUseCase = new CheckinUseCase(checkinsRepository, gymsRepository)
  return checkinUseCase
}
