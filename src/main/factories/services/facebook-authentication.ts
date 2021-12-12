import { makeFacebookApi } from '@/main/factories/api'
import { makePgUserAccountRepo } from '@/main/factories/repos'
import { makeJwtTokenGenerator } from '@/main/factories/crypto'
import { FacebookAuthenticationService } from '@/domain/services'

export const makeFacebookAuthenticationService = (): FacebookAuthenticationService =>
  new FacebookAuthenticationService(makeFacebookApi(), makePgUserAccountRepo(), makeJwtTokenGenerator())
