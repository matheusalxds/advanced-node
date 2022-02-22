import { AwsS3FileStorage } from '@/infra/gateways'
import { env } from '@/main/config/env'

import axios from 'axios'

describe('Aws S3 integration tests', () => {
  let sut: AwsS3FileStorage

  beforeEach(() => {
    sut = new AwsS3FileStorage(env.s3.accessKey, env.s3.secret, env.s3.bucket)
  })

  test('should upload and delete image from aws s3', async () => {
    // to get some image
    // https://shoonia.github.io/1x1/#11ffc2ff
    const onePixelImage = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAAaADAAQAAAABAAAAAQAAAAD5Ip3+AAAADUlEQVQIHWMIdTr5HwAEsAJgyEWtvgAAAABJRU5ErkJggg=='
    const file = Buffer.from(onePixelImage, 'base64')
    const key = 'any_key.png'

    const pictureUrl = await sut.upload({ key, file })

    expect((await axios.get(pictureUrl)).status).toBe(200)

    await sut.delete({ key })

    await expect(axios.get(pictureUrl)).rejects.toThrow()
  })
})
