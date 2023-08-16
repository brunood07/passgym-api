import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import Search from './search'
import Nearby from './nearby'
import Create from './create'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  const create = new Create()
  const search = new Search()
  const nearby = new Nearby()

  app.post('/gyms', create.handle)
  app.get('/gyms/search', search.handle)
  app.get('/gyms/nearby', nearby.handle)
}
