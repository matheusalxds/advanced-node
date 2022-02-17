export interface HttpGetClient {
  get: <R = any>(params: HttpGetClient.Params) => Promise<R>
}

export namespace HttpGetClient {
  export type Params = {
    url: string
    params: object
  }
}
