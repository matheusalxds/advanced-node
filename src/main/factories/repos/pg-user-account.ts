import { PgUserAccountRepository } from '@/infra/postgres/repos'

export const makePgUserAccountRepo = (): PgUserAccountRepository => new PgUserAccountRepository()
