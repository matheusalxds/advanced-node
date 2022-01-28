import { mocked } from 'ts-jest/utils'
import { UUIDGenerator } from '@/domain/contracts/gateways'

import { v4 } from 'uuid'

jest.mock('uuid')

class UUIDHandler {
  uuid ({ key }: UUIDGenerator.Input): UUIDGenerator.Ouput {
    return `${key}_${v4()}`
  }
}

describe('UUIDHandler', () => {
  let sut : UUIDHandler

  beforeAll(() => {
    mocked(v4).mockReturnValue('any_uuid')
  })

  beforeEach(() => {
    sut = new UUIDHandler()
  })

  test('should call uuid.v4', () => {
    const sut = new UUIDHandler()

    sut.uuid({ key: 'any_key' })

    expect(v4).toHaveBeenCalledTimes(1)
  })

  test('should return correct uuid', () => {
    const sut = new UUIDHandler()

    const uuid = sut.uuid({ key: 'any_key' })

    expect(uuid).toBe('any_key_any_uuid')
  })
})
