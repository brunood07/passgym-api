import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import PasswordHash from '@/entities/passward-hash'
import { User } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export default class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  execute = async (
    data: AuthenticateUseCaseRequest,
  ): Promise<AuthenticateUseCaseResponse> => {
    const { email, password } = data

    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new InvalidCredentialsError()
    const hash = new PasswordHash(password)
    const doestPasswordMatches = await hash.compare(user.password_hash)
    if (!doestPasswordMatches) throw new InvalidCredentialsError()

    return { user }
  }
}
