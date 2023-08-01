import PrismaCheckinsRepository from '@/repositories/prisma/prisma-check-ins-repository'
import ValidateCheckinUseCase from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const checkinsRepository = new PrismaCheckinsRepository()
  const validateCheckinUseCase = new ValidateCheckinUseCase(checkinsRepository)
  return validateCheckinUseCase
}
