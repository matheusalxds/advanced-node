import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('Facebook Api integration tests', () => {
  test('should call a Facebook User if token is valid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)

    const fbUser = await sut.loadUser({ token: 'EAAXAvfT8OUoBABoyPJWhMjrtCxPrBoZC5X75iG0LybsxeRZCufu0O1lDRY3DjVFmtNAkMeb6vBvpkKYcNggu1Q50IMflmASU0f2nwIoZAzvbJhpMMyu1oGwpJmZC6QWNNlsuj75lBb9vsnvlhFdd0ATicyUUZAqoyNw8pBZA3cz6Ms1DPo5Gt2ZAzsg4KZC2w3fvkNyg8Xvz03R5vssOsUdT' })

    expect(fbUser).toEqual({
      facebookId: '102718828934394',
      email: 'matheus_sicvvej_test@tfbnw.net',
      name: 'Matheus Test'
    })
  })

  test('should return undefined if token is invalid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)

    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })
})
