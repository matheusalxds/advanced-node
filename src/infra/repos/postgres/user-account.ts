import { LoadUserAccount, SaveFacebookAccount } from '@/domain/contracts/repos'
import { PgUser } from '@/infra/repos/postgres/entities'
import { PgRepository } from '@/infra/repos/postgres/repository'

export class PgUserAccountRepository extends PgRepository implements LoadUserAccount, SaveFacebookAccount {
  async load ({ email }: LoadUserAccount.Params): Promise<LoadUserAccount.Result> {
    const pgUserRepo = this.getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email })
    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }

    return undefined
  }

  async saveWithFacebook ({ id, name, email, facebookId }: SaveFacebookAccount.Params): Promise<SaveFacebookAccount.Result> {
    const pgUserRepo = this.getRepository(PgUser)
    let resultId: string

    if (id === undefined) {
      const pgUser = await pgUserRepo.save({ email, name, facebookId })
      resultId = pgUser.id.toString()
    } else {
      resultId = id
      await pgUserRepo.update({ id: parseInt(id) }, { name, facebookId })
    }
    return { id: resultId }
  }
}
