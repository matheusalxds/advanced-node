import { UUIDGenerator } from '@/domain/contracts/gateways'

import { v4 } from 'uuid'

export class UUIDHandler implements UUIDGenerator {
  uuid ({ key }: UUIDGenerator.Input): UUIDGenerator.Ouput {
    return `${key}_${v4()}`
  }
}
