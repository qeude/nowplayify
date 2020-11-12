import request from './request'

const createRequestInterceptor = (store) => {
  request.interceptors.request.use(function (config) {
    const basic = Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString('base64')
    config.headers.common.Authorization = `Basic ${basic}`
    return config
  }, null)
}

const createResponseInterceptor = (store) => {
  request.interceptors.response.use(null, (error) => {
    const { status, data } = error.response

    if (status === 403 && data.error.reason === 'PREMIUM_REQUIRED') {
      return Promise.reject(error)
    }

    // reject promise if custom error
    if (status !== 401) {
      return Promise.reject(error)
    }

    try {
      store.dispatch('auth/refreshAccessToken')
    } catch (e) {
      console.error(e)
    }
  })
}

const plugin = (store) => {
  createRequestInterceptor(store)
  createResponseInterceptor(store)
}

export default plugin
