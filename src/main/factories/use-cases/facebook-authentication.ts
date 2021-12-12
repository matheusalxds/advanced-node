import { makeFacebookApi } from '@/main/factories/api'
import { makePgUserAccountRepo } from '@/main/factories/repos'
import { makeJwtTokenGenerator } from '@/main/factories/crypto'
import { FacebookAuthenticationUseCase } from '@/domain/use-cases'

export const makeFacebookAuthentication = (): FacebookAuthenticationUseCase =>
  new FacebookAuthenticationUseCase(makeFacebookApi(), makePgUserAccountRepo(), makeJwtTokenGenerator())
