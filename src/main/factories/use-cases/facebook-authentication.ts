import { makeFacebookApi, makeJwtTokenHandler } from '@/main/factories/gateways'
import { makePgUserAccountRepo } from '@/main/factories/repos'
import { FacebookAuthentication, setupFacebookAuthentication } from '@/domain/use-cases'

export const makeFacebookAuthentication = (): FacebookAuthentication =>
  setupFacebookAuthentication(makeFacebookApi(), makePgUserAccountRepo(), makeJwtTokenHandler())
