import { env } from '@/main/config/env'
import { JwtTokenGeneratorAdapter } from '@/infra/crypto'

export const makeJwtTokenGenerator = (): JwtTokenGeneratorAdapter => new JwtTokenGeneratorAdapter(env.jwtSecret)
