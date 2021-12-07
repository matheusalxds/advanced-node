import { FacebookAuthentication } from '@/domain/features'
import { AuthenticationError } from '@/domain/errors'
import { AccessToken } from '@/domain/models'
import { FacebookLoginController } from '@/application/controllers/facebook-login'
import { ServerError, UnauthorizedError } from '@/application/errors'
import { RequiredStringValidator } from '@/application/validation'

import { mock, MockProxy } from 'jest-mock-extended'
import { mocked } from 'ts-jest/utils'

jest.mock('@/application/validation/required-string')

describe('FacebookLoginController', () => {
  let sut: FacebookLoginController
  let facebookAuth: MockProxy<FacebookAuthentication>
  let token: string

  beforeAll(() => {
    token = 'any_token'
    facebookAuth = mock()
    facebookAuth.perform.mockResolvedValue(new AccessToken('any_value'))
  })

  beforeEach(() => {
    sut = new FacebookLoginController(facebookAuth)
  })

  test('should return 400 if validation fails', async () => {
    const error = new Error('validation_error')
    const RequiredStringValidatorSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValue(error)
    }))
    mocked(RequiredStringValidator).mockImplementationOnce(RequiredStringValidatorSpy)

    const httpResponse = await sut.handle({ token })

    expect(RequiredStringValidator).toHaveBeenCalledWith('any_token', 'token')
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
  })

  test('should call FacebookAuthentication with correct params', async () => {
    await sut.handle({ token })

    expect(facebookAuth.perform).toHaveBeenCalledWith({ token })
  })

  test('should return 401 if authentication fails', async () => {
    facebookAuth.perform.mockResolvedValueOnce(new AuthenticationError())
    const httpResponse = await sut.handle({ token })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  test('should return 200 if authentication succeeds', async () => {
    const httpResponse = await sut.handle({ token })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        accessToken: 'any_value'
      }
    })
  })

  test('should return 200 if authentication succeeds', async () => {
    const error = new Error('infra_error')
    facebookAuth.perform.mockRejectedValueOnce(error)
    const httpResponse = await sut.handle({ token })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })
})
