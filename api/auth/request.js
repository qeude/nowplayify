import axios from 'axios'

const request = axios.create({
  baseURL: `${process.env.authApiUrl}`,
})

export default request
