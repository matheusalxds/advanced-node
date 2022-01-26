import { SaveUserPicture, LoadUserProfile } from '@/domain/contracts/repos'
import { UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'

type Setup = (fileStorage: UploadFile, crypto: UUIDGenerator, userProfileRepo: SaveUserPicture & LoadUserProfile) => ChangeProfilePicture
type Input = { id: string, file?: Buffer }
export type ChangeProfilePicture = (input: Input) => Promise<void>

export const setupChangeProfilePicture: Setup = (fileStorage, crpyto, userProfileRepo) => async ({ id, file }) => {
  let pictureUrl: string | undefined
  let initials: string | undefined
  if (file !== undefined) {
    pictureUrl = await fileStorage.upload({ file, key: crpyto.uuid({ key: id }) })
  } else {
    const { name } = await userProfileRepo.load({ id })

    if (name !== undefined) {
      const firstLetters = name.match(/\b(.)/g) ?? []
      if (firstLetters.length > 1) {
        initials = `${firstLetters.shift()?.toUpperCase() ?? ''}${firstLetters.pop()?.toUpperCase() ?? ''}`
      } else {
        initials = name.substring(0, 2)?.toUpperCase()
      }
    }
  }
  await userProfileRepo.savePicture({ pictureUrl, initials })
}
