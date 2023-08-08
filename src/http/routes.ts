import { FastifyInstance } from 'fastify'
import Register from './controllers/register'
import AuthenticateController from './controllers/authenticate'
import ProfileController from './controllers/profile'
import { verifyJWT } from './middlewares/verify-jwt'
import { app } from '@/app'

export async function appRoutes(app: FastifyInstance) {
  const register = new Register()
  const authenticate = new AuthenticateController()

  app.post('/users', register.handle)
  app.post('/sessions', authenticate.handle)

  const profile = new ProfileController()

  /** Authenticated routes */
  app.get('/me', { onRequest: [verifyJWT] }, profile.handle)
}
