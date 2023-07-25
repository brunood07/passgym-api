import { expect, describe, it, beforeEach } from 'vitest'
import RegisterUseCase from './register'
import UsersRepositoryInMemory from '@/repositories/users-repository-in-memory'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import PasswordHash from '@/entities/passward-hash'

let registerUseCase: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    registerUseCase = new RegisterUseCase(new UsersRepositoryInMemory())
  })

  it('should be able to register', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    })

    expect(user.id).toEqual('user-john@doe.com')
  })

  it('should hash user password uppon registration', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    })

    const hash = new PasswordHash('123456')
    const isPasswordCorrectlyHashed = await hash.compare(user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    await registerUseCase.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email: 'john@doe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
