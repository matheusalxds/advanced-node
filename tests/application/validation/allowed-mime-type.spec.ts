import { InvalidMimeTypeError } from '@/application/errors'

type Extension = 'png' | 'jpg'

export class AllowedMimeTypes {
  constructor (
    private readonly allowed: Extension[],
    private readonly mimeType: string
  ) {}

  validate (): Error | undefined {
    let isValid = false
    if (this.isPng()) isValid = true
    else if (this.isJpg()) isValid = true
    if (!isValid) return new InvalidMimeTypeError(this.allowed)
  }

  private isPng (): boolean {
    return this.allowed.includes('png') && this.mimeType === 'image/png'
  }

  private isJpg (): boolean {
    return this.allowed.includes('jpg') && /image\/jpe?g/.test(this.mimeType)
  }
}

describe('AllowedMimeTypes', () => {
  test('should return InvalidMimeTypeError if value is invalid', async () => {
    const sut = new AllowedMimeTypes(['png'], 'image/jpg')

    const error = sut.validate()

    expect(error).toEqual(new InvalidMimeTypeError(['png']))
  })

  test('should return undefined if value is valid', async () => {
    const sut = new AllowedMimeTypes(['png'], 'image/png')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  test('should return undefined if value is valid', async () => {
    const sut = new AllowedMimeTypes(['jpg'], 'image/jpg')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  test('should return undefined if value is valid', async () => {
    const sut = new AllowedMimeTypes(['jpg'], 'image/jpeg')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
