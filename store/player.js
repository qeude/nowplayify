import api from '@/api'

export const state = () => ({
  deviceID: '',
  playback: '',
  playbackContext: '',
})

export const getters = {
  getDeviceID: (state) => state.deviceID,
  getPlayback: (state) => state.playback,
  getPlaybackContext: (state) => state.playbackContext,
  isPlaying: (state) => state.playback.is_playing,
}

export const mutations = {
  setDeviceID(state, deviceID) {
    state.deviceID = deviceID
  },
  setPlayback(state, playback) {
    state.playback = playback
  },
  setPlaybackContext(state, playback) {
    state.playbackContext = playback
  },
}

export const actions = {
  async init({ commit, rootGetters, dispatch }) {
    await dispatch('auth/refreshAccessToken', null, { root: true })
    const loop = async () => {
      await dispatch('setPlayback')
    }
    if (this.loopInterval !== null) {
      clearInterval(this.loopInterval)
      this.loopInterval = null
    }
    this.loopInterval = setInterval(loop.bind(this), 1500)
    loop()
  },

  async setPlayback({ commit }) {
    try {
      const response = await api.spotify.getCurrentPlayback()
      console.log(response)
      commit('setPlayback', response.data)
    } catch (e) {
      console.log(e)
    }
  },

  setPlaybackContext({ commit }, context) {
    commit('setPlaybackContext', context)
  },
}
