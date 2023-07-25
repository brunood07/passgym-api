import { expect, describe, it, beforeEach } from 'vitest'
import UsersRepositoryInMemory from '@/repositories/users-repository-in-memory'
import AuthenticateUseCase from './authenticate'
import PasswordHash from '@/entities/passward-hash'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: UsersRepositoryInMemory
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    authenticateUseCase = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const encrypt = new PasswordHash('123456')
    const password_hash = await encrypt.hash(6)

    await usersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password_hash,
    })
    const { user } = await authenticateUseCase.execute({
      email: 'john@doe.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(() =>
      authenticateUseCase.execute({
        email: 'john@doe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const encrypt = new PasswordHash('123456')
    const password_hash = await encrypt.hash(6)

    await usersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password_hash,
    })

    expect(() =>
      authenticateUseCase.execute({
        email: 'john@doe.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
