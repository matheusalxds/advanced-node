import { mock } from 'jest-mock-extended'

type Setup = (fileStorage: UploadFile, crypto: UUIDGenerator) => ChangeProfilePicture
type Input = { id: string, file: Buffer }
type ChangeProfilePicture = (input: Input) => Promise<void>

const setupChangeProfilePicture: Setup = (fileStorage, crpyto) => async ({ id, file }) => {
  await fileStorage.upload({ file, key: crpyto.uuid({ key: id }) })
}

interface UploadFile {
  upload: (input: UploadFile.Input) => Promise<void>
}

namespace UploadFile {
  export type Input = { file: Buffer, key: string }
}

interface UUIDGenerator {
  uuid: (input: UUIDGenerator.Input) => UUIDGenerator.Ouput
}

namespace UUIDGenerator {
  export type Input = { key: string }
  export type Ouput = string
}

describe('ChangeProfilePicture', () => {
  test('should call UploadFile with correct input', async () => {
    const uuid = 'any_unique_id'
    const file = Buffer.from('any_buffer')
    const fileStorage = mock<UploadFile>()
    const crypto = mock<UUIDGenerator>()
    crypto.uuid.mockReturnValue(uuid)
    const sut = setupChangeProfilePicture(fileStorage, crypto)

    await sut({ id: 'any_id', file })

    expect(fileStorage.upload).toHaveBeenCalledWith({ file, key: uuid })
    expect(fileStorage.upload).toHaveBeenCalledTimes(1)
  })
})
