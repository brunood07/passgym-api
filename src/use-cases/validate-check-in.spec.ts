import CheckinsRepositoryInMemory from '@/repositories/in-memory/check-ins-repository-in-memory'
import { beforeEach, it, describe, expect, vi, afterEach } from 'vitest'
import ValidateCheckinUseCase from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckinValidationError } from './errors/late-check-in-validation-error'

let checkinRepository: CheckinsRepositoryInMemory
let validateCheckinUseCase: ValidateCheckinUseCase

describe('Validate Check In Use Case', () => {
  beforeEach(() => {
    checkinRepository = new CheckinsRepositoryInMemory()
    validateCheckinUseCase = new ValidateCheckinUseCase(checkinRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate a check in', async () => {
    const newCheckin = await checkinRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkin } = await validateCheckinUseCase.execute({
      checkinId: newCheckin.id,
    })

    expect(checkin.validated_at).toEqual(expect.any(Date))
    expect(checkinRepository.checkIns[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check in', async () => {
    await expect(
      validateCheckinUseCase.execute({
        checkinId: 'inexistent-01',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const newCheckin = await checkinRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      validateCheckinUseCase.execute({
        checkinId: newCheckin.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckinValidationError)
  })
})
