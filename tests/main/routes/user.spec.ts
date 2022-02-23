import { app } from '@/main/config/app'
import { env } from '@/main/config/env'
import { PgUser } from '@/infra/repos/postgres/entities'
import { makeFakeDb } from '@/tests/infra/repos/postgres/mocks'

import { IBackup } from 'pg-mem'
import { getConnection, getRepository, Repository } from 'typeorm'
import request from 'supertest'
import { sign } from 'jsonwebtoken'

describe('User Routes', () => {
  let backup: IBackup
  let pgUserRepo: Repository<PgUser>

  beforeAll(async () => {
    const db = await makeFakeDb([PgUser])
    backup = db.backup()
    pgUserRepo = getRepository(PgUser)
  })

  beforeEach(() => {
    backup.restore()
  })

  afterAll(async () => await getConnection().close())

  describe('DELETE /users/picture', () => {
    test('should return 403 if no authorization header is present', async () => {
      const { status } = await request(app)
        .delete('/api/users/picture')

      expect(status).toBe(403)
    })

    test('should return 200 with valid data', async () => {
      const { id } = await pgUserRepo.save({ email: 'any_email', name: 'Matheus alexandre' })
      const authorization = sign({ key: id }, env.jwtSecret)

      const { status, body } = await request(app)
        .delete('/api/users/picture')
        .set({ authorization })

      expect(status).toBe(200)
      expect(body).toEqual({ pictureUrl: undefined, initials: 'MA' })
    })
  })

  describe('PUT /users/picture', () => {
    test('should return 403 if no authorization header is present', async () => {
      const { status } = await request(app)
        .put('/api/users/picture')

      expect(status).toBe(403)
    })
  })
})
