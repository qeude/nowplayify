import axios from 'axios'

export const state = () => ({
  isConnected: false,
  nowPlaying: {},
  message: null,
  recentlyPlayed: {},
  trackProgress: 0,
  isPlaying: false,
})

export const mutations = {
  connectionChange(state, isConnected) {
    state.isConnected = isConnected
  },
  messageChange(state, message) {
    state.message = message
  },
  nowPlayingChange(state, nowPlaying) {
    state.nowPlaying = nowPlaying
  },
  isPlayingChange(state, isPlaying) {
    state.isPlaying = isPlaying
  },
  progressChange(state, { progress, duration }) {
    console.log(`progress ${progress}`)
    console.log(`duration ${duration}`)
    state.trackProgress = (progress / duration) * 100
  },
  recentlyPlayedChange(state, recentlyPlayed) {
    state.recentlyPlayed = recentlyPlayed
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    try {
      //   const {
      //     data: { is_connected: isConnected },
      //   } = await axios.get(`http://localhost:3000/toto`)

      //   commit('connectionChange', is_connected)
      //   if (is_connected) {
      const {
        data: { song, isPlaying },
      } = await axios.get(`http://localhost:3000/api/spotify/now-playing`)

      commit('nowPlayingChange', song)
      commit('isPlayingChange', isPlaying)
      //   }
    } catch (err) {
      console.error(err)
    }
  },
  updateProgress: ({ commit, state }, props) => {
    commit('progressChange', props)
    return state.trackProgress
  },
  updateTrack: ({ commit, state }, nowPlaying) => {
    commit('nowPlayingChange', nowPlaying)
    return state.nowPlaying
  },
  updateStatus: ({ commit, state }, isPlaying) => {
    commit('isPlayingChange', isPlaying)
    return state.isPlaying
  },
  updateConnection: ({ commit, state }, isConnected) => {
    commit('connectionChange', isConnected)
    return state.isConnected
  },
}
