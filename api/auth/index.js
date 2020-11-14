import request from './request'

// const basic = Buffer.from(
//   `${process.env.spotifyCliendId}:${process.env.spotifyClientSecret}`
// ).toString('base64')

export default {
  getUserAuthURL(scopes) {
    return request.get(`login?scope=${encodeURIComponent(scopes.join(' '))}`)
  },

  getToken(refreshToken) {
    return request.post(
      'token',
      {
        refresh_token: `${refreshToken}`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  },
}
