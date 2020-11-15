import api from '@/api'

export const state = () => ({
  refreshToken: '',
  accessToken: '',
  expiresIn: '',
})

export const getters = {
  getAccessToken: (state) => state.accessToken,
  getRefreshToken: (state) => state.refreshToken,
  getExpiresIn: (state) => state.expiresIn,
}

export const mutations = {
  setAccessToken(state, token) {
    state.accessToken = token
  },
  setRefreshToken(state, token) {
    state.refreshToken = token
  },
  setExpiresIn(state, expiresIn) {
    state.expiresIn = expiresIn
  },
}

export const actions = {
  async init({ commit, dispatch }) {
    const response = await dispatch('fetchToken')
    commit('setAccessToken', response.data.access_token || '')
    commit('setExpiresIn', response.data.expires_in || '')
    await dispatch('onNewAccessToken')
  },

  login({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      const url = api.auth.getUserAuthURL([
        'user-read-playback-state',
        'user-top-read',
      ])

      const width = 450
      const height = 730
      const left = screen.width / 2 - width / 2
      const top = screen.height / 2 - height / 2

      window.addEventListener(
        'message',
        (event) => {
          try {
            const hash = JSON.parse(event.data)
            if (hash.type === 'access_token') {
              commit('setAccessToken', hash.access_token)
              commit('setExpiresIn', hash.expires_in)
              dispatch('onNewAccessToken')
              if (this.accessToken === '') {
                reject(Error())
              } else {
                const refreshToken = hash.refresh_token
                commit('setRefreshToken', refreshToken)
                resolve(hash.access_token)
              }
            }
          } catch (e) {}
        },
        false
      )

      window.open(
        url,
        'Spotify',
        'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' +
          width +
          ', height=' +
          height +
          ', top=' +
          top +
          ', left=' +
          left
      )
    })
  },

  async fetchToken() {
    try {
      const response = await api.auth.getToken()
      return response
    } catch (e) {
      console.error(e)
    }
  },

  async onNewAccessToken({ commit, rootGetters, dispatch }) {
    if (!rootGetters['auth/getAccessToken']) {
      console.log('Got empty access token, log out')
      dispatch('logout')
      await dispatch('login')
    }
  },

  logout({ dispatch }) {
    dispatch('setAccessToken', '')
  },

  setAccessToken({ commit }, token) {
    commit('setAccessToken', token)
  },
  setExpiryTime({ commit }, time) {
    commit('setExpiryTime', time)
  },
}
