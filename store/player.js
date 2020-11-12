import api from '@/api'

export const state = () => ({
  deviceID: '',
  playback: '',
  progressMs: '',
})

export const getters = {
  getDeviceID: (state) => state.deviceID,
  getPlayback: (state) => state.playback,
  isPlaying: (state) => state.playback.is_playing,
  getProgressMs: (state) => state.progressMs,
  getProgressPercentage: (state) =>
    (state.progressMs / state.playback?.item?.duration_ms) * 100,
}

export const mutations = {
  setDeviceID(state, deviceID) {
    state.deviceID = deviceID
  },
  setPlayback(state, playback) {
    state.playback = playback
  },
  setProgressMs(state, progressMs) {
    state.progressMs = progressMs
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

    const progressLoop = () => {
      if (rootGetters['player/isPlaying'])
        commit('setProgressMs', rootGetters['player/getProgressMs'] + 50)
    }
    if (this.progressInterval !== null) {
      clearInterval(this.progressInterval)
      this.progressInterval = null
    }
    this.progressInterval = setInterval(progressLoop.bind(this), 50)
    progressLoop()
  },

  async setPlayback({ commit }) {
    try {
      const response = await api.spotify.getCurrentPlayer()
      if (response.status === 200) {
        commit('setPlayback', response.data)
        commit('setProgressMs', response.data.progress_ms)
      }
    } catch (e) {
      console.log(e)
    }
  },
}