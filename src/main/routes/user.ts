import { makeSavePictureController } from '@/main/factories/application/controllers'
import { adaptExpressRoute as adapt } from '@/main/adapters'

import { Router } from 'express'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.put('/users/picture', auth)
  router.delete('/users/picture', auth, adapt(makeSavePictureController()))
}
