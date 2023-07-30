import CheckinsRepositoryInMemory from '@/repositories/in-memory/check-ins-repository-in-memory'
import { beforeEach, describe, expect, it } from 'vitest'
import GetUserMetricsUseCase from './get-user-metrics'

let checkinsRepository: CheckinsRepositoryInMemory
let getUserMetricsUseCase: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    checkinsRepository = new CheckinsRepositoryInMemory()
    getUserMetricsUseCase = new GetUserMetricsUseCase(checkinsRepository)
  })

  it('should be able to get user metrics', async () => {
    await checkinsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkinsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await getUserMetricsUseCase.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toBe(2)
  })
})
