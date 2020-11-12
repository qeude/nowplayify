export const state = () => ({
  notFound: false,
})

export const getters = {
  notFound: (state) => state.notFound,
}

export const mutations = {
  setNotFound(state, status) {
    state.notFound = status
  },
}

export const actions = {
  notFoundPage({ commit }, status) {
    commit('setNotFound', status)
  },
  init({ dispatch }) {
    require('dotenv').config()
    dispatch('player/init', null, { root: true })
  },
}
