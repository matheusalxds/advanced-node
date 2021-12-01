import { PgUser } from '@/infra/postgres/entities'
import { PgUserAccountRepository } from '@/infra/postgres/repos'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'

import { getConnection, getRepository, Repository } from 'typeorm'
import { IBackup } from 'pg-mem'

describe('PgUserAccountRepository', () => {
  let sut: PgUserAccountRepository
  let pgUserRepo: Repository<PgUser>
  let backup: IBackup

  beforeAll(async () => {
    const db = await makeFakeDb([PgUser])
    backup = db.backup()
    pgUserRepo = getRepository(PgUser)
  })

  beforeEach(() => {
    backup.restore()
    sut = new PgUserAccountRepository()
  })

  afterAll(async () => await getConnection().close())

  describe('load()', () => {
    test('should return an account if email exists', async () => {
      await pgUserRepo.save({ email: 'any_email' })

      const account = await sut.load({ email: 'any_email' })

      expect(account).toEqual({ id: '1' })
    })

    test('should return undefined if email does not exists', async () => {
      const account = await sut.load({ email: 'any_email' })

      expect(account).toBeUndefined()
    })
  })

  describe('saveWithFacebook()', () => {
    test('should create an account if id is undefined', async () => {
      await sut.saveWithFacebook({ email: 'any_email', name: 'any_name', facebookId: 'any_fb_id' })
      const pgUser = await pgUserRepo.findOne({ email: 'any_email' })

      expect(pgUser?.id).toBe(1)
    })
  })
})
