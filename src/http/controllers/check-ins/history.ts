import { makeCFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export default class History {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const checkInHistoryQuerySchema = z.object({
      page: z.coerce.number().min(1).default(1),
    })

    const data = checkInHistoryQuerySchema.parse(request.query)
    try {
      const checkInHistoryUseCase = makeCFetchUserCheckInsHistoryUseCase()
      await checkInHistoryUseCase.execute({
        userId: request.user.sub,
        page: data.page,
      })

      return reply.status(201).send()
    } catch (err) {
      reply.status(400).send()
    }
  }
}
