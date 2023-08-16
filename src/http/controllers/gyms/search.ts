import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export default class Search {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const searchGymQuerySchema = z.object({
      query: z.string(),
      page: z.coerce.number().min(1).default(1),
    })

    const data = searchGymQuerySchema.parse(request.query)
    try {
      const searchGymUseCase = makeSearchGymsUseCase()
      await searchGymUseCase.execute(data)

      return reply.status(201).send()
    } catch (err) {
      reply.status(400).send()
    }
  }
}
