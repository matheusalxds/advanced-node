import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { mock } from 'jest-mock-extended'

class FacebookApi {
  private readonly baseUrl ='https://graph.facebook.com'

  constructor (private readonly httpClient: HttpGetClient) { }

  async loadUser (params: LoadFacebookUserApi.Params): Promise<void> {
    await this.httpClient.get({ url: `${this.baseUrl}/oath/access_token` })
  }
}

export interface HttpGetClient {
  get: (params: HttpGetClient.Params) => Promise<void>
}

namespace HttpGetClient{
  export type Params = {
    url: string
  }
}

describe('FacebookApi', () => {
  test('should get app token', async () => {
    const httpClient = mock<HttpGetClient>()
    const sut = new FacebookApi(httpClient)

    await sut.loadUser({ token: 'any_client_token ' })

    expect(httpClient.get).toHaveBeenCalledWith({
      url: 'https://graph.facebook.com/oath/access_token'
    })
  })
})
