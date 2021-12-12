export class AuthenticationError extends Error {
  constructor () {
    super('Authentication fails')
    this.name = 'AuthenticationError'
  }
}
