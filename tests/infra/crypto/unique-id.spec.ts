import { UniqueId } from '@/infra/crypto'

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
