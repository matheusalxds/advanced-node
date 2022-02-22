import { makeDeletePictureController } from '@/main/factories/application/controllers'
import { adaptExpressRoute as adapt } from '@/main/adapters'

import { Router } from 'express'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.delete('/users/picture', auth, adapt(makeDeletePictureController()))
}
