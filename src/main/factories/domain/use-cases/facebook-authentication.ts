import { makeFacebookApi, makeJwtTokenHandler } from '@/main/factories/infra/gateways'
import { makePgUserAccountRepo } from '@/main/factories/infra/repos'
import { FacebookAuthentication, setupFacebookAuthentication } from '@/domain/use-cases'

export const makeFacebookAuthentication = (): FacebookAuthentication =>
  setupFacebookAuthentication(makeFacebookApi(), makePgUserAccountRepo(), makeJwtTokenHandler())
