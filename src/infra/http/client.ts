export interface HttpGetClient {
  get: <R = any>(params: HttpGetClient.Params) => Promise<R>
}

namespace HttpGetClient{
  export type Params = {
    url: string
    params: object
  }
}
