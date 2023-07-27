import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import CheckinUseCase from './checkin'
import CheckinsRepositoryInMemory from '@/repositories/in-memory/check-ins-repository-in-memory'
import GymsRepositoryInMemory from '@/repositories/in-memory/gyms-repository-in-memory'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins'
import { MaxDistanceError } from './errors/max-distance-error'

let checkinsRepository: CheckinsRepositoryInMemory
let gymsRepository: GymsRepositoryInMemory
let checkinUseCase: CheckinUseCase

describe('Checkin Use Case', () => {
  beforeEach(() => {
    checkinsRepository = new CheckinsRepositoryInMemory()
    gymsRepository = new GymsRepositoryInMemory()
    checkinUseCase = new CheckinUseCase(checkinsRepository, gymsRepository)

    gymsRepository.gyms.push({
      id: 'gym-01',
      title: 'Marreta Gym',
      description: '',
      phone: '',
      latitude: new Decimal(23.5896832),
      longitude: new Decimal(-46.5666048),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to start a check in', async () => {
    const { checkin } = await checkinUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 23.5896832,
      userLongitude: -46.5666048,
    })

    expect(checkin.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in a day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await checkinUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 23.5896832,
      userLongitude: -46.5666048,
    })

    await expect(() =>
      checkinUseCase.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: 23.5896832,
        userLongitude: -46.5666048,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await checkinUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 23.5896832,
      userLongitude: -46.5666048,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkin } = await checkinUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 23.5896832,
      userLongitude: -46.5666048,
    })

    expect(checkin.id).toEqual(expect.any(String))
  })

  it('should not be able to a check in on a distant gym', async () => {
    gymsRepository.gyms.push({
      id: 'gym-02',
      title: 'Marreta Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-23.2615706),
      longitude: new Decimal(-46.373643),
    })

    await expect(
      checkinUseCase.execute({
        gymId: 'gym-02',
        userId: 'user-02',
        userLatitude: 23.5896832,
        userLongitude: -46.5666048,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
