import { UniqueId, UUIDHandler } from '@/infra/gateways'

export const makeUUUIDHandler = (): UUIDHandler => new UUIDHandler()

export const makeUniqueId = (): UniqueId => new UniqueId(new Date())
