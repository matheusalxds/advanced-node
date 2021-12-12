import { TokenGenerator } from '@/domain/contracts/crypto'

import jwt from 'jsonwebtoken'

type Params = TokenGenerator.Params
type Result = TokenGenerator.Result

export class JwtTokenGenerator implements TokenGenerator {
  constructor (private readonly secret: string) {}

  async generateToken ({ expirationInMs, key }: Params): Promise<Result> {
    const expiresInSeconds = expirationInMs / 1000
    return jwt.sign({ key }, this.secret, { expiresIn: expiresInSeconds })
  }
}
