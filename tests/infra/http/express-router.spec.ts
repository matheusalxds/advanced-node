import { getMockReq, getMockRes } from '@jest-mock/express'
import { mock } from 'jest-mock-extended'
import { Controller } from '@/application/controllers'
import { Request, Response } from 'express'

export class ExpressRouter {
  constructor (private readonly controller: Controller) {}

  async adapt (req: Request, res: Response): Promise<void> {
    await this.controller.handle({ ...req.body })
  }
}

describe('ExpressRouter', () => {
  test('should call handle with correct request', async () => {
    const req = getMockReq({ body: { any: 'any' } })
    const { res } = getMockRes()
    const controller = mock<Controller>()

    const sut = new ExpressRouter(controller)

    await sut.adapt(req, res)

    expect(controller.handle).toHaveBeenCalledWith({ any: 'any' })
  })
  test('should call handle with empty request', async () => {
    const req = getMockReq()
    const { res } = getMockRes()
    const controller = mock<Controller>()

    const sut = new ExpressRouter(controller)

    await sut.adapt(req, res)

    expect(controller.handle).toHaveBeenCalledWith({})
  })
})
