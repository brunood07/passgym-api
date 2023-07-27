import { describe, it, beforeEach, expect } from 'vitest'
import GetUserProfileUseCase from './get-user-profile'
import PasswordHash from '@/entities/passward-hash'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import UsersRepositoryInMemory from '@/repositories/in-memory/users-repository-in-memory'

let usersRepository: UsersRepositoryInMemory
let getUserProfile: GetUserProfileUseCase

describe('Get User Profile use case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    getUserProfile = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const hashing = new PasswordHash('123456')
    const password_hash = await hashing.hash(6)
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password_hash,
    })

    const { user } = await getUserProfile.execute({ userId: createdUser.id })
    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      getUserProfile.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
