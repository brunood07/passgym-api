import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export default class Nearby {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const nearbyGymBodySchema = z.object({
      latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90
      }),
      longitude: z.number().refine((value) => {
        return Math.abs(value) <= 180
      }),
    })

    const data = nearbyGymBodySchema.parse(request.body)
    try {
      const nearbyGymUseCase = makeFetchNearbyGymsUseCase()
      await nearbyGymUseCase.execute({
        userLatitude: data.latitude,
        userLongitude: data.longitude,
      })

      return reply.status(201).send()
    } catch (err) {
      reply.status(400).send() // TODO
    }
  }
}
