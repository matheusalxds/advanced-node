export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '1619296975075658',
    clientSecret: process.env.FB_CLIENT_SECRET ?? 'aa8618449c0b2b6c33fcaa51cf264d64'
  },
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? 'my_secret'
}
