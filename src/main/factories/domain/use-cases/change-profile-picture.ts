import { ChangeProfilePicture, setupChangeProfilePicture } from '@/domain/use-cases'
import { makeAwsS3FileStorage, makeUniqueId } from '@/main/factories/infra/gateways'
import { makePgUserProfileRepo } from '@/main/factories/infra/repos/postgres'

export const makeChangeProfilePicture = (): ChangeProfilePicture =>
  setupChangeProfilePicture(
    makeAwsS3FileStorage(),
    makeUniqueId(),
    makePgUserProfileRepo()
  )
