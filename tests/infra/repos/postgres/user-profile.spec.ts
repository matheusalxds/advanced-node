import { PgUser } from '@/infra/repos/postgres/entities'
import { PgRepository, PgUserProfileRepository } from '@/infra/repos/postgres'
import { PgConnection } from '@/infra/repos/postgres/helpers'
import { makeFakeDb } from '@/tests/infra/repos/postgres/mocks'

import { Repository } from 'typeorm'
import { IBackup } from 'pg-mem'

describe('PgUserProfileRepository', () => {
  let sut: PgUserProfileRepository
  let connection: PgConnection
  let pgUserRepo: Repository<PgUser>
  let backup: IBackup

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await makeFakeDb([PgUser])
    backup = db.backup()
    pgUserRepo = connection.getRepository(PgUser)
  })

  beforeEach(() => {
    backup.restore()
    sut = new PgUserProfileRepository()
  })

  afterAll(async () => await connection.disconnect())

  test('should extends PgRepository', async () => {
    expect(sut).toBeInstanceOf(PgRepository)
  })

  describe('savePicture()', () => {
    test('should update user profile', async () => {
      const { id } = await pgUserRepo.save({ email: 'any_email', initials: 'any_initials' })

      await sut.savePicture({ id: id.toString(), pictureUrl: 'any_url' })
      const pgUser = await pgUserRepo.findOne({ id })

      expect(pgUser).toMatchObject({ id, pictureUrl: 'any_url', initials: null })
    })
  })

  describe('load()', () => {
    test('should load user profile', async () => {
      const { id } = await pgUserRepo.save({ email: 'any_email', name: 'any_name' })

      const userProfile = await sut.load({ id: id.toString() })

      expect(userProfile?.name).toBe('any_name')
    })

    test('should load user profile', async () => {
      const { id } = await pgUserRepo.save({ email: 'any_email' })

      const userProfile = await sut.load({ id: id.toString() })

      expect(userProfile?.name).toBe(undefined)
    })

    test('should return undefined', async () => {
      const userProfile = await sut.load({ id: '1' })

      expect(userProfile).toBeUndefined()
    })
  })
})
