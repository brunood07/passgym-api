import CheckinsRepositoryInMemory from '@/repositories/in-memory/check-ins-repository-in-memory'
import { beforeEach, describe, expect, it } from 'vitest'
import FetchUserCheckInsHistory from './fetch-user-check-ins-history'

let checkinsRepository: CheckinsRepositoryInMemory
let fetchUserCheckinsUseCase: FetchUserCheckInsHistory

describe('Fetch user checkins use case', () => {
  beforeEach(async () => {
    checkinsRepository = new CheckinsRepositoryInMemory()
    fetchUserCheckinsUseCase = new FetchUserCheckInsHistory(checkinsRepository)
  })

  it('should be able to retrive user checkins', async () => {
    await checkinsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkinsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkIns } = await fetchUserCheckinsUseCase.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  it('should be able to retrive user checkins', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkinsRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }
    const { checkIns } = await fetchUserCheckinsUseCase.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
