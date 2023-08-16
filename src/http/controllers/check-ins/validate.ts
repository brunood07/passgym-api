import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export default class Validate {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const validateCheckinParamSchema = z.object({
      checkInId: z.string().uuid(),
    })

    const data = validateCheckinParamSchema.parse(request.params)
    try {
      const validateCheckinUseCase = makeValidateCheckInUseCase()
      await validateCheckinUseCase.execute({
        checkinId: data.checkInId,
      })

      return reply.status(201).send()
    } catch (err) {
      reply.status(400).send()
    }
  }
}
