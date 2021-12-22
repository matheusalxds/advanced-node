import { makeJwtTokenHandler } from '@/main/factories/crypto'
import { AuthenticationMiddleware } from '@/application/middlewares'

export const makeAuthenticationMiddleware = (): AuthenticationMiddleware => {
  const jwt = makeJwtTokenHandler()
  return new AuthenticationMiddleware(jwt.validateToken.bind(jwt))
}
