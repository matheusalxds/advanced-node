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
export interface SaveFacebookAccountRepository {
  saveWithFacebook: (params: SaveFacebookAccountRepository.Params) => Promise<SaveFacebookAccountRepository.Result>
}

export namespace SaveFacebookAccountRepository {
  export type Params = {
    id?: string
    email: string
    facebookId: string
    name: string
  }

  export type Result = undefined
}
