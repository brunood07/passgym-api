import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { User } from '@prisma/client'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export default class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  execute = async (
    data: GetUserProfileUseCaseRequest,
  ): Promise<GetUserProfileUseCaseResponse> => {
    const { userId } = data

    const user = await this.usersRepository.findById(userId)
    if (!user) throw new ResourceNotFoundError()

    return { user }
  }
}
