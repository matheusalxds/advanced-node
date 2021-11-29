import { TokenGenerator } from '@/data/contracts/crypto'

import jwt from 'jsonwebtoken'

export class JwtTokenGeneratorAdapter {
  constructor (private readonly secret: string) {}

  async generateToken (params: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    const expiresInSeconds = params.expirationInMs / 1000
    return jwt.sign({ key: params.key }, this.secret, { expiresIn: expiresInSeconds })
  }
}
