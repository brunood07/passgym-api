import FetchNearbyGymsUseCase from './fetch-nearby-gyms'
import { beforeEach, describe, it, expect } from 'vitest'
import GymsRepositoryInMemory from '@/repositories/in-memory/gyms-repository-in-memory'

let gymsRepository: GymsRepositoryInMemory
let fetchNearbyGymsUsecase: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new GymsRepositoryInMemory()
    fetchNearbyGymsUsecase = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: 23.5896832,
      longitude: -46.5666048,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -27.2615706,
      longitude: -49.373643,
    })

    const { gyms } = await fetchNearbyGymsUsecase.execute({
      userLatitude: 23.5896832,
      userLongitude: -46.5666048,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
