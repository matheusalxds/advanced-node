import cors from 'cors'
import { Express, json } from 'express'

export const setupMiddlewares = (app: Express): void => {
  app.use(cors())
  app.use(json())
  app.use((req, res, next) => {
    res.type('json')
    next()
  })
}
