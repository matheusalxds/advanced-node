import { makeJwtTokenHandler } from '@/main/factories/crypto'
import { setupAuthorize } from '@/domain/use-cases'
import { AuthenticationMiddleware } from '@/application/middlewares'

export const makeAuthenticationMiddleware = (): AuthenticationMiddleware => {
  const authorize = setupAuthorize(makeJwtTokenHandler())
  return new AuthenticationMiddleware(authorize)
}
