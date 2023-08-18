import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import Create from './create'
import Metrics from './metrics'
import History from './history'
import Validate from './validate'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function checkinsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  const create = new Create()
  const history = new History()
  const metrics = new Metrics()
  const validate = new Validate()

  app.post('/gyms/:gymId/check-ins', create.handle)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: verifyUserRole('ADMIN') },
    validate.handle,
  )
  app.get('/check-ins/history', history.handle)
  app.get('/check-ins/metrics', metrics.handle)
}
