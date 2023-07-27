import GymsRepositoryInMemory from '@/repositories/in-memory/gyms-repository-in-memory'
import { expect, it, describe, beforeEach } from 'vitest'
import CreateGymUseCase from './create-gym'

let gymsRepository: GymsRepositoryInMemory
let createGymUseCase: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new GymsRepositoryInMemory()
    createGymUseCase = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create a new gym', async () => {
    const { gym } = await createGymUseCase.execute({
      title: 'Marreta Gym',
      description: null,
      phone: null,
      latitude: -23.2615706,
      longitude: -46.373643,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
