import request from './request'

const basic = Buffer.from(
  `${process.env.spotifyCliendId}:${process.env.spotifyClientSecret}`
).toString('base64')

export default {
  getAccessToken() {
    return request.post('token', null, {
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        grant_type: 'refresh_token',
        refresh_token: `${process.env.spotifyRefreshToken}`,
      },
    })
  },
}
