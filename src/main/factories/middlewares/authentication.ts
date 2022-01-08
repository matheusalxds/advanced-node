import { makeJwtTokenHandler } from '@/main/factories/gateways'
import { AuthenticationMiddleware } from '@/application/middlewares'

export const makeAuthenticationMiddleware = (): AuthenticationMiddleware => {
  const jwt = makeJwtTokenHandler()
  return new AuthenticationMiddleware(jwt.validate.bind(jwt))
}
