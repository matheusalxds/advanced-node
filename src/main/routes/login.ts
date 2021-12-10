import { makeFacebookLoginController } from '@/main/factories/controllers'
import { adaptExpressRoute as adapt } from '@/infra/http'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/api/login/facebook', adapt(makeFacebookLoginController()))
}
