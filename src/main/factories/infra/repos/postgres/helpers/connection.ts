import { PgConnection } from '@/infra/repos/postgres/helpers'

export const makePgConnection = (): PgConnection => PgConnection.getInstance()
