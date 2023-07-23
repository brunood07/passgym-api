import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import RegisterUseCase from '@/use-cases/register'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export default class Register {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const data = registerBodySchema.parse(request.body)
    try {
      const registerUseCase = new RegisterUseCase(new PrismaUsersRepository())
      await registerUseCase.execute(data)

      return reply.status(201).send()
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        reply.status(409).send(err.message)
      }
      reply.status(400).send() // TODO
    }
  }
}
