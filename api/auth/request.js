import axios from 'axios'

const request = axios.create({
  baseURL: 'https://accounts.spotify.com/api/',
})

export default request
