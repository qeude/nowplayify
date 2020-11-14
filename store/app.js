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
  async init({ dispatch }) {
    await dispatch('auth/init', null, { root: true })
    dispatch('player/init', null, { root: true })
  },
}
