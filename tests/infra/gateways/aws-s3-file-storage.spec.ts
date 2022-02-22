import { AwsS3FileStorage } from '@/infra/gateways'

import { config, S3 } from 'aws-sdk'
import { mocked } from 'jest-mock'

jest.mock('aws-sdk')

describe('AwsS3FileStorage', () => {
  let sut: AwsS3FileStorage
  let accessKey: string
  let secret: string
  let bucket: string
  let fileName: string

  beforeAll(() => {
    accessKey = 'any_access_key'
    secret = 'any_secret'
    bucket = 'any_bucket'
    fileName = 'any_key'
  })

  beforeEach(() => {
    sut = new AwsS3FileStorage(accessKey, secret, bucket)
  })

  test('should config aws credentials on creation', async () => {
    expect(sut).toBeDefined()
    expect(config.update).toHaveBeenCalledWith({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secret
      }
    })
    expect(config.update).toHaveBeenCalledTimes(1)
  })

  describe('upload', () => {
    let file: Buffer
    let putObjectPromiseSpy: jest.Mock
    let pubObjectSpy: jest.Mock

    beforeAll(() => {
      file = Buffer.from('any_buffer')
      // mocking a class
      putObjectPromiseSpy = jest.fn()
      pubObjectSpy = jest.fn().mockImplementation(() => ({
        promise: putObjectPromiseSpy
      }))
      mocked(S3).mockImplementation(
        jest.fn().mockImplementation(() => ({
          putObject: pubObjectSpy
        }))
      )
    })

    test('should call putObject with correct input', async () => {
      await sut.upload({ fileName, file })

      expect(pubObjectSpy).toHaveBeenCalledWith({
        Bucket: bucket,
        Key: fileName,
        Body: file,
        ACL: 'public-read' // it's necessary to access the image through the url
      })
      expect(pubObjectSpy).toHaveBeenCalledTimes(1)
      expect(putObjectPromiseSpy).toHaveBeenCalledTimes(1)
    })

    test('should call return imageUrl', async () => {
      const imageUrl = await sut.upload({ fileName, file })

      expect(imageUrl).toBe(`https://${bucket}.s3.amazonaws.com/${fileName}`)
    })

    test('should return encoded imageUrl', async () => {
      const imageUrl = await sut.upload({ fileName: 'any file key', file })

      expect(imageUrl).toBe(`https://${bucket}.s3.amazonaws.com/any%20file%20key`)
    })

    test('should rethrow if putObject throws', async () => {
      const error = new Error('upload_error')
      putObjectPromiseSpy.mockRejectedValueOnce(error)

      const promise = sut.upload({ fileName, file })

      await expect(promise).rejects.toThrow(error)
    })
  })

  describe('delete', () => {
    let deleteObjectPromiseSpy: jest.Mock
    let deleteObjectSpy: jest.Mock

    beforeAll(() => {
      // mocking a class
      deleteObjectPromiseSpy = jest.fn()
      deleteObjectSpy = jest.fn().mockImplementation(() => ({
        promise: deleteObjectPromiseSpy
      }))
      mocked(S3).mockImplementation(
        jest.fn().mockImplementation(() => ({
          deleteObject: deleteObjectSpy
        }))
      )
    })

    test('should call deleteObject with correct input', async () => {
      await sut.delete({ fileName })

      expect(deleteObjectSpy).toHaveBeenCalledWith({
        Bucket: bucket,
        Key: fileName
      })
      expect(deleteObjectSpy).toHaveBeenCalledTimes(1)
      expect(deleteObjectPromiseSpy).toHaveBeenCalledTimes(1)
    })

    test('should rethrow if deleteObject throws', async () => {
      const error = new Error('delete_error')
      deleteObjectPromiseSpy.mockRejectedValueOnce(error)

      const promise = sut.delete({ fileName })

      await expect(promise).rejects.toThrow(error)
    })
  })
})
