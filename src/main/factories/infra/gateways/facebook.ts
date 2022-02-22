import { env } from '@/main/config/env'
import { FacebookApi } from '@/infra/gateways'
import { makeAxiosHttpClient } from './'

export const makeFacebookApi = (): FacebookApi => new FacebookApi(makeAxiosHttpClient(), env.facebookApi.clientId, env.facebookApi.clientSecret)
