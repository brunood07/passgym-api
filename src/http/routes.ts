import { FastifyInstance } from 'fastify'
import Register from './controllers/register'
import AuthenticateController from './controllers/authenticate'

export async function appRoutes(app: FastifyInstance) {
  const register = new Register()
  const authenticate = new AuthenticateController()

  app.post('/users', register.handle)
  app.post('/sessions', authenticate.handle)
}
