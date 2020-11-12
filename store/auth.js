import api from '@/api'

export const state = () => ({
  accessToken: '',
  expiryTime: '',
})

export const getters = {
  getAccessToken: (state) => state.accessToken,
  getExpiryTime: (state) => state.expiryTime,
}

export const mutations = {
  setAccessToken(state, token) {
    state.accessToken = token
  },
  setExpiryTime(state, time) {
    state.expiryTime = time
  },
}

export const actions = {
  // async login() {
  //   try {
  //     const response = await api.auth.getUserAuthURL()
  //     if (response.data) {
  //       window.location.href = response.data
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // },

  async refreshAccessToken({ commit, dispatch }) {
    try {
      const response = await api.auth.getAccessToken()

      commit('setAccessToken', response.data.access_token)

      const accessToken = response.data.access_token
      dispatch('setAccessToken', accessToken)

      return response
    } catch (e) {
      console.log(e)
    }
  },

  logout() {
    const script = document.createElement('script')

    script.src = 'https://www.spotify.com/logout/'
    document.getElementById('app').appendChild(script)

    window.localStorage.clear()
    window.sessionStorage.clear()

    setTimeout(() => {
      location.reload()
    }, 1000)
  },

  setAccessToken({ commit }, token) {
    commit('setAccessToken', token)
  },
  setExpiryTime({ commit }, time) {
    commit('setExpiryTime', time)
  },
}

// const module = {
//   namespaced: true,
//   state,
//   getters,
//   mutations,
//   actions,
// }

// export default module
