import { app } from '@/app'
import request from 'supertest'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'

describe('Authenticate e2e', () => {
  beforeAll(async () => {
    await app.ready()

    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })

  it('should not be able to authenticate with invalid credentials', async () => {
    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '654321',
    })

    expect(response.statusCode).toEqual(400)
  })
})
