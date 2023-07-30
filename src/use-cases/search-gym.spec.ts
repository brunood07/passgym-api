import GymsRepositoryInMemory from '@/repositories/in-memory/gyms-repository-in-memory'
import { beforeEach, describe, expect, it } from 'vitest'
import SearchGymUseCase from './search-gym'

let gymsRepository: GymsRepositoryInMemory
let searchGymUseCase: SearchGymUseCase

describe('Search Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new GymsRepositoryInMemory()
    searchGymUseCase = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to fetch gyms', async () => {
    await gymsRepository.create({
      title: 'gym-01',
      description: null,
      phone: null,
      latitude: -23.2615706,
      longitude: -46.373643,
    })

    await gymsRepository.create({
      title: 'gym-02',
      description: null,
      phone: null,
      latitude: -23.2615706,
      longitude: -46.373643,
    })

    const { gyms } = await searchGymUseCase.execute({
      query: 'gym-01',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'gym-01' })])
  })

  it('should be able to search paginated gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `gym-${i}`,
        description: null,
        phone: null,
        latitude: -23.2615706,
        longitude: -46.373643,
      })
    }

    const { gyms } = await searchGymUseCase.execute({ query: 'gym', page: 2 })
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'gym-21' }),
      expect.objectContaining({ title: 'gym-22' }),
    ])
  })
})
