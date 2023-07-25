import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

export interface RegisterDTO {
  name: string
  email: string
  password: string
}

interface RegisterResponse {
  user: User
}

export default class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  execute = async (data: RegisterDTO): Promise<RegisterResponse> => {
    const { email, name, password } = data
    const emailAlreadyRegistered = await this.usersRepository.findByEmail(email)
    if (emailAlreadyRegistered) throw new UserAlreadyExistsError()
    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
    return { user }
  }
}
