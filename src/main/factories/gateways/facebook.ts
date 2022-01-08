import { env } from '@/main/config/env'
import { FacebookApi } from '@/infra/apis'
import { makeAxiosHttpClient } from '@/main/factories/http'

export const makeFacebookApi = (): FacebookApi => new FacebookApi(makeAxiosHttpClient(), env.facebookApi.clientId, env.facebookApi.clientSecret)
