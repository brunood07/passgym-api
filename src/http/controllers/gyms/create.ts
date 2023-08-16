import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export default class Create {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const createGymBodySchema = z.object({
      title: z.string(),
      description: z.string().nullable(),
      phone: z.string().nullable(),
      latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90
      }),
      longitude: z.number().refine((value) => {
        return Math.abs(value) <= 180
      }),
    })

    const data = createGymBodySchema.parse(request.body)
    try {
      const createGymUseCase = makeCreateGymUseCase()
      await createGymUseCase.execute(data)

      return reply.status(201).send()
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        reply.status(409).send(err.message)
      }
      reply.status(400).send() // TODO
    }
  }
}
