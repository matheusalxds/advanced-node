import { env } from '@/main/config/env'
import { JwtTokenHandler } from '@/infra/crypto'

export const makeJwtTokenHandler = (): JwtTokenHandler => new JwtTokenHandler(env.jwtSecret)
