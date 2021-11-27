import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { LoadUserAccountRepository } from '@/data/contracts/repos'
import { FacebookAuthentication } from '@/domain/features'
import { AuthenticationError } from '@/domain/errors'

export class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserApi: LoadFacebookUserApi,
    private readonly loadUserAccountRepo: LoadUserAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.loadFacebookUserApi.loadUser(params)
    if (fbData !== undefined) await this.loadUserAccountRepo.load({ email: fbData.email })

    return new AuthenticationError()
  }
}
