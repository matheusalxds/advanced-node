export interface UUIDGenerator {
  uuid: (input: UUIDGenerator.Input) => UUIDGenerator.Ouput
}

export namespace UUIDGenerator {
  export type Input = { key: string }
  export type Ouput = string
}
