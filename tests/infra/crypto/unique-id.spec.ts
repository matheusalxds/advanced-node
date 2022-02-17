import { UUIDGenerator } from '@/domain/contracts/gateways'

class UniqueId implements UUIDGenerator {
  constructor (private readonly date: Date) { }

  uuid ({ key }: UUIDGenerator.Input): UUIDGenerator.Ouput {
    return (
      key +
      '_' +
      this.date.getFullYear() +
      (this.date.getMonth() + 1).toString().padStart(2, '0') +
      this.date.getDate().toString().padStart(2, '0') +
      this.date.getHours().toString().padStart(2, '0') +
      this.date.getMinutes().toString().padStart(2, '0') +
      this.date.getSeconds().toString().padStart(2, '0')
    )
  }
}

describe('UniqueId', () => {
  test('should call uuid.v4', () => {
    const sut = new UniqueId(new Date(2021, 9, 10, 10, 10, 10))

    const uuid = sut.uuid({ key: 'any_key' })

    expect(uuid).toBe('any_key_20211010101010')
  })

  test('should call uuid.v4', () => {
    const sut = new UniqueId(new Date(2018, 2, 10, 18, 1, 0))

    const uuid = sut.uuid({ key: 'any_key' })

    expect(uuid).toBe('any_key_20180310180100')
  })
})
