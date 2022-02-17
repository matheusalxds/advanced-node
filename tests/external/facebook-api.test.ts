import { FacebookApi, AxiosHttpClient } from '@/infra/gateways'
import { env } from '@/main/config/env'

describe('Facebook Api integration tests', () => {
  let axiosClient: AxiosHttpClient
  let sut: FacebookApi

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)
  })

  test('should call a Facebook User if token is valid', async () => {
    const fbUser = await sut.loadUser({ token: env.facebookApi.accessToken })

    expect(fbUser).toEqual({
      facebookId: '102718828934394',
      email: 'matheus_sicvvej_test@tfbnw.net',
      name: 'Matheus Test'
    })
  })

  test('should return undefined if token is invalid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })
})
