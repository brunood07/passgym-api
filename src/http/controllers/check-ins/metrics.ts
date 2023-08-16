import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export default class Metrics {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const getUserMetricsUseCase = makeGetUserMetricsUseCase()
      await getUserMetricsUseCase.execute({
        userId: request.user.sub,
      })

      return reply.status(201).send()
    } catch (err) {
      reply.status(400).send()
    }
  }
}
