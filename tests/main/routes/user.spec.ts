import { app } from '@/main/config/app'
import { env } from '@/main/config/env'
import { PgUser } from '@/infra/repos/postgres/entities'
import { makeFakeDb } from '@/tests/infra/repos/postgres/mocks'
import { PgConnection } from '@/infra/repos/postgres/helpers'

import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'
import { sign } from 'jsonwebtoken'
import request from 'supertest'

describe('User Routes', () => {
  let backup: IBackup
  let connection: PgConnection
  let pgUserRepo: Repository<PgUser>

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await makeFakeDb([PgUser])
    backup = db.backup()
    pgUserRepo = connection.getRepository(PgUser)
  })

  beforeEach(() => {
    backup.restore()
  })

  afterAll(async () => await connection.disconnect())

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
    const uploadSpy = jest.fn()

    jest.mock('@/infra/gateways/aws-s3-file-storage', () => ({
      AwsS3FileStorage: jest.fn().mockReturnValue({ upload: uploadSpy })
    }))

    test('should return 403 if no authorization header is present', async () => {
      const { status } = await request(app)
        .put('/api/users/picture')

      expect(status).toBe(403)
    })

    test('should return 200 with valid data', async () => {
      uploadSpy.mockResolvedValueOnce('any_url')
      const { id } = await pgUserRepo.save({ email: 'any_email', name: 'Matheus alexandre' })
      const authorization = sign({ key: id }, env.jwtSecret)

      const { status, body } = await request(app)
        .put('/api/users/picture')
        .set({ authorization })
        .attach('picture', Buffer.from('any_from'), { filename: 'any_name', contentType: 'image/png' })

      expect(status).toBe(200)
      expect(body).toEqual({ pictureUrl: 'any_url', initials: undefined })
    })
  })
})
