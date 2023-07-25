import CheckinsRepositoryInMemory from '@/repositories/check-ins-repository-in-memory'
import { expect, describe, it, beforeEach } from 'vitest'
import CheckinUseCase from './checkin'

let checkinsRepository: CheckinsRepositoryInMemory
let checkinUseCase: CheckinUseCase

describe('Checkin Use Case', () => {
  beforeEach(() => {
    checkinsRepository = new CheckinsRepositoryInMemory()
    checkinUseCase = new CheckinUseCase(checkinsRepository)
  })

  it('should be able to start a check in', async () => {
    const { checkin } = await checkinUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkin.id).toEqual(expect.any(String))
  })
})
