import { expect, describe, it } from 'vitest'
import RegisterUseCase from './register'
import { compare } from 'bcryptjs'
import UsersRepositoryInMemory from '@/repositories/users-repository-in-memory'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const registerUseCase = new RegisterUseCase(new UsersRepositoryInMemory())
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    })

    expect(user.id).toEqual('user-john@doe.com')
  })

  it('should hash user password uppon registration', async () => {
    const registerUseCase = new RegisterUseCase(new UsersRepositoryInMemory())
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const registerUseCase = new RegisterUseCase(new UsersRepositoryInMemory())
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
