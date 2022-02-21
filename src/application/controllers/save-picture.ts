import { ChangeProfilePicture } from '@/domain/use-cases'
import { badRequest, HttpResponse, ok } from '@/application/helpers'
import { InvalidMimeTypeError, MaxFileSizeError, RequiredFieldError } from '@/application/errors'
import { Controller } from '@/application/controllers/controller'

type HttpRequest = { file: { buffer: Buffer, mimeType: string }, userId: string }
type Model = Error | { initials?: string, pictureUrl?: string}

export class SavePictureController extends Controller {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {
    super()
  }

  override async perform ({ file, userId }: HttpRequest): Promise<HttpResponse<Model>> {
    if (file === undefined || file === null) return badRequest(new RequiredFieldError('file'))
    if (file.buffer.length === 0) return badRequest(new RequiredFieldError('file'))
    if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimeType)) return badRequest(new InvalidMimeTypeError(['png', 'jpeg', 'jpg']))
    if (file.buffer.length > 5 * 1024 * 1024) return badRequest(new MaxFileSizeError(5))
    const data = await this.changeProfilePicture({ id: userId, file: file.buffer })

    return ok(data)
  }
}
