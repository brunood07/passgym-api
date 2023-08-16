import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export default class Create {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const createCheckInsParamsSchema = z.object({
      gymId: z.string().uuid(),
    })
    const createCheckinBodySchema = z.object({
      latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90
      }),
      longitude: z.number().refine((value) => {
        return Math.abs(value) <= 180
      }),
    })

    const data = createCheckinBodySchema.parse(request.body)
    const { gymId } = createCheckInsParamsSchema.parse(request.params)
    try {
      const createCheckinUseCase = makeCheckInUseCase()
      await createCheckinUseCase.execute({
        userLatitude: data.latitude,
        userLongitude: data.longitude,
        gymId,
        userId: request.user.sub,
      })

      return reply.status(201).send()
    } catch (err) {
      reply.status(400).send() // TODO
    }
  }
}
