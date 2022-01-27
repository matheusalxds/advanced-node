import { UserProfile } from '@/domain/entities'
import { SaveUserPicture, LoadUserProfile } from '@/domain/contracts/repos'
import { UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'

type Setup = (fileStorage: UploadFile, crypto: UUIDGenerator, userProfileRepo: SaveUserPicture & LoadUserProfile) => ChangeProfilePicture
type Input = { id: string, file?: Buffer }
export type ChangeProfilePicture = (input: Input) => Promise<void>

export const setupChangeProfilePicture: Setup = (fileStorage, crpyto, userProfileRepo) => async ({ id, file }) => {
  const data: {pictureUrl?: string | undefined, name?: string | undefined } = {}
  if (file !== undefined) {
    data.pictureUrl = await fileStorage.upload({ file, key: crpyto.uuid({ key: id }) })
  } else {
    data.name = (await userProfileRepo.load({ id })).name
  }
  const userProfile = new UserProfile(id)
  userProfile.setPicture(data)
  await userProfileRepo.savePicture(userProfile)
}
