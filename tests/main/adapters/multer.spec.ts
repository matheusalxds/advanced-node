import { RequestHandler } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import multer from 'multer'
import { mocked } from 'jest-mock'

jest.mock('multer')

const adaptMulter: RequestHandler = (req, res, next) => {
  const upload = multer().single('picture')
  upload(req, res, () => {})
}

describe('MulterAdapter', () => {
  test('should call singe upload with correct input', async () => {
    const uploadSpy = jest.fn()
    const singleSpy = jest.fn().mockImplementation(() => uploadSpy)
    const multerSpy = jest.fn().mockImplementation(() => ({ single: singleSpy }))
    const fakeMulter = multer as jest.Mocked<typeof multer>
    mocked(fakeMulter).mockImplementation(multerSpy)
    const req = getMockReq()
    const res = getMockRes().res
    const next = getMockRes().next
    const sut = adaptMulter

    sut(req, res, next)

    expect(multerSpy).toHaveBeenCalledWith()
    expect(multerSpy).toHaveBeenCalledTimes(1)
    expect(singleSpy).toHaveBeenCalledWith('picture')
    expect(singleSpy).toHaveBeenCalledTimes(1)
    expect(uploadSpy).toHaveBeenCalledWith(req, res, expect.any(Function))
    expect(uploadSpy).toHaveBeenCalledTimes(1)
  })
})
