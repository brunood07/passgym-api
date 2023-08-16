import { FastifyInstance } from 'fastify'
import Register from './register'
import AuthenticateController from './authenticate'
import ProfileController from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  const register = new Register()
  const authenticate = new AuthenticateController()

  app.post('/users', register.handle)
  app.post('/sessions', authenticate.handle)

  const profile = new ProfileController()

  /** Authenticated routes */
  app.get('/me', { onRequest: [verifyJWT] }, profile.handle)
}
