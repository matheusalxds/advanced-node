import { UserProfile } from '@/domain/entities'
import { SaveUserPicture, LoadUserProfile } from '@/domain/contracts/repos'
import { DeleteFile, UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'

type Setup = (fileStorage: UploadFile & DeleteFile, crypto: UUIDGenerator, userProfileRepo: SaveUserPicture & LoadUserProfile) => ChangeProfilePicture
type Input = { id: string, file?: { buffer: Buffer, mimeType: string } }
type Output = { pictureUrl?: string, initials?: string }
export type ChangeProfilePicture = (input: Input) => Promise<Output>

export const setupChangeProfilePicture: Setup = (fileStorage, crpyto, userProfileRepo) => async ({ id, file }) => {
  const key = crpyto.uuid({ key: id })
  const data = {
    pictureUrl: file !== undefined ? await fileStorage.upload({ file: file.buffer, fileName: `${key}.${file.mimeType.split('/')[1]}` }) : undefined,
    name: file === undefined ? (await userProfileRepo.load({ id }))?.name : undefined
  }
  const userProfile = new UserProfile(id)
  userProfile.setPicture(data)
  try {
    await userProfileRepo.savePicture(userProfile)
  } catch (error) {
    if (file !== undefined) await fileStorage.delete({ fileName: key })
    throw error
  }
  return userProfile
}
