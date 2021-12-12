import { env } from '@/main/config/env'
import { JwtTokenHandler } from '@/infra/crypto'

export const makeJwtTokenGenerator = (): JwtTokenHandler => new JwtTokenHandler(env.jwtSecret)
