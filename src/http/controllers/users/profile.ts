import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export default class ProfileController {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const getUserProfile = makeGetUserProfileUseCase()
    const profile = await getUserProfile.execute({ userId: request.user.sub })

    return reply.status(200).send({
      profile: {
        ...profile,
        password_hash: undefined,
      },
    })
  }
}
