export interface SaveUserPicture {
  savePicture: (params: SaveUserPicture.Params) => Promise<void>
}

export namespace SaveUserPicture {
  export type Params = { pictureUrl: string }
}
