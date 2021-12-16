import { makeFacebookApi } from '@/main/factories/api'
import { makePgUserAccountRepo } from '@/main/factories/repos'
import { makeJwtTokenGenerator } from '@/main/factories/crypto'
import { FacebookAuthentication, setupFacebookAuthentication } from '@/domain/use-cases'

export const makeFacebookAuthentication = (): FacebookAuthentication =>
  setupFacebookAuthentication(makeFacebookApi(), makePgUserAccountRepo(), makeJwtTokenGenerator())