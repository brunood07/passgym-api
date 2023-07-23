import { FastifyInstance } from 'fastify'
import Register from './controllers/register'

export async function appRoutes(app: FastifyInstance) {
  const register = new Register()

  app.post('/users', register.handle)
}
