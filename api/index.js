import express from 'express'
import axios from 'axios'

require('dotenv').config()

// Express app
const app = express()
app.use(express.json())

const basic = Buffer.from(
  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
).toString('base64')
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_ENDPOINT =
  'https://api.spotify.com/v1/me/player/currently-playing'

const getAccessToken = async () => {
  const response = await axios({
    method: 'post',
    url: TOKEN_ENDPOINT,
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      grant_type: 'refresh_token',
      refresh_token: `${process.env.SPOTIFY_REFRESH_TOKEN}`,
    },
  })
  // .catch(({ response }) => {
  //   console.log(response)
  // })
  return response.data
}

export const getNowPlaying = async () => {
  const { access_token: accessToken } = await getAccessToken()

  return await axios.get(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

app.get('/toto', async (req, res) => {
  const response = await getNowPlaying()
  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false })
  }
  const song = await response.data
  const isPlaying = song.is_playing
  const title = song.item.name
  const artist = song.item.artists.map((_artist) => _artist.name).join(', ')
  const album = song.item.album.name
  const albumImageUrl = song.item.album.images[0].url
  const songUrl = song.item.external_urls.spotify

  return res.status(200).json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
  })
})

module.exports = {
  path: '/api',
  handler: app,
}
