import request from './request'

export default {
  getCurrentPlayback() {
    return request.get('me/player')
  },
  getNowPlaying() {
    return request.get('me/player/currently-playing')
  },
  getCurrentPlayer() {
    return request.get('me/player')
  },
  transferUsersPlayback(deviceIds, play = false) {
    return request.put('me/player', {
      device_ids: deviceIds,
      play,
    })
  },
}
