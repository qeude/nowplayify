import request from './request'

export default {
  getCurrentPlayer() {
    return request.get('me/player')
  },
}
