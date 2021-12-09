import { FacebookLoginController } from '@/application/controllers'
import { makeFacebookAuthenticationService } from '@/main/factories/services'

export const makeFacebookLoginController = (): FacebookLoginController => new FacebookLoginController(makeFacebookAuthenticationService())
