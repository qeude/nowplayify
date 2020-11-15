import request from './request'

export default {
  getUserAuthURL(scopes) {
    return `${process.env.authApiUrl}login?scope=${encodeURIComponent(
      scopes.join(' ')
    )}`
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
