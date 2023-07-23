import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { registerUseCase } from '@/use-cases/register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const data = registerBodySchema.parse(request.body)
  try {
    await registerUseCase(data)

    return reply.status(201).send()
  } catch (err) {
    reply.status(400).send()
  }
}
