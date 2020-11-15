import request from './request'

export default {
  getCurrentPlayer() {
    return request.get('me/player')
  },

  getTopTracks() {
    return request.get('me/top/tracks', {
      params: {
        limit: 10,
        time_range: 'short_term',
      },
    })
  },
}
