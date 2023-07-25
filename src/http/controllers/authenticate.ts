import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import AuthenticateUseCase from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export default class AuthenticateController {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const registerBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, password } = registerBodySchema.parse(request.body)

    try {
      const authenticateUseCase = new AuthenticateUseCase(
        new PrismaUsersRepository(),
      )

      const auth = authenticateUseCase.execute({ email, password })

      return reply.status(200).send()
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        return reply.status(400).send({ message: err.message })
      }

      throw err
    }
  }
}
