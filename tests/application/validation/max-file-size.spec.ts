import { MaxFileSizeError } from '@/application/errors'
import { MaxFileSize } from '@/application/validation'

describe('AllowedMimeTypes', () => {
  test('should return MaxFileSizeError if value is invalid', async () => {
    const invalidBuffer = Buffer.from(new ArrayBuffer(6 * 1024 * 1024))
    const sut = new MaxFileSize(5, invalidBuffer)

    const error = sut.validate()

    expect(error).toEqual(new MaxFileSizeError(5))
  })

  test('should return undefined if value is valid', async () => {
    const buffer = Buffer.from(new ArrayBuffer(4 * 1024 * 1024))
    const sut = new MaxFileSize(5, buffer)

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  test('should return undefined if value is valid', async () => {
    const buffer = Buffer.from(new ArrayBuffer(5 * 1024 * 1024))
    const sut = new MaxFileSize(5, buffer)

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
