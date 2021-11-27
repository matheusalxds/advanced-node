export interface LoadUserAccountRepository {
  load: (params: LoadUserAccountRepository.Params) => Promise<LoadUserAccountRepository.Result>
}

export namespace LoadUserAccountRepository {
  export type Params = {
    email: string
  }

  export type Result = undefined | {
    id: string
    name?: string
  }
}

// Facebook related interfaces
export interface CreateFacebookAccountRepository {
  createFromFacebook: (params: CreateFacebookAccountRepository.Params) => Promise<CreateFacebookAccountRepository.Result>
}

export namespace CreateFacebookAccountRepository {
  export type Params = {
    email: string
    facebookId: string
    name: string
  }

  export type Result = undefined
}

export interface UpdateFacebookAccountRepository {
  updateWithFacebook: (params: UpdateFacebookAccountRepository.Params) => Promise<UpdateFacebookAccountRepository.Result>
}

export namespace UpdateFacebookAccountRepository {
  export type Params = {
    id: string
    name: string
    facebookId: string
  }

  export type Result = undefined
}
