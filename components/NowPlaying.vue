<template>
  <div class="flex flex-row items-center p-5">
    <img
      v-if="image"
      class="h-32 w-32 rounded-3xl"
      :src="image"
      alt="Album Artwork"
    />
    <div class="ml-5">
      <div class="uppercase font-bold text-left text-white">
        {{ name }}
      </div>
      <div class="tracking-wide font-medium text-white text-left">
        {{ artistsList }}
      </div>
      <div class="text-white">
        {{ progress }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isPlaying', 'nowPlaying'],
  data() {
    return { staleTimer: '', trackTimer: '' }
  },
  computed: {
    name() {
      return this.nowPlaying.name
    },
    image() {
      const { album, image } = this.nowPlaying
      if (album) {
        const { url } = album.images[0]
        return url
      }
      return (
        image ||
        'https://developer.spotify.com/assets/branding-guidelines/icon2@2x.png'
      )
    },
    progress() {
      return this.$store.state.trackProgress
    },
    artistsList() {
      const { artists } = this.nowPlaying
      return artists ? artists.map((artist) => artist.name).join(', ') : null
    },
  },
  created() {
    this.getNowPlaying()
    this.staleTimer = setInterval(() => {
      this.getNowPlaying()
    }, 5000)
  },
  methods: {
    updateProgress(progress = 0, duration = 0) {
      this.$store.dispatch('updateProgress', { progress, duration })
    },
    async getNowPlaying() {
      const {
        progress_ms: progressMs,
        is_playing: isPlaying,
        item,
      } = await this.$axios.$get(`/api/spotify/now-playing/`)
      if (item) {
        const progress = progressMs
        const duration = item.duration_ms
        this.$store.dispatch('updateStatus', isPlaying)
        clearInterval(this.trackTimer)
        if (isPlaying) {
          this.timeTrack(Date.now(), duration, progress)
        } else {
          this.updateProgress(progress, duration)
        }
        const { id } = this.nowPlaying
        if (item.id !== id) {
          this.$store.dispatch('updateTrack', item)
        }
      }
    },
    timeTrack(now, duration, progress) {
      const remainder = duration - progress
      const until = now + remainder
      this.trackTimer = setInterval(() => {
        const newNow = Date.now()
        if (newNow < until + 2500) {
          const newRemainder = until - newNow
          const newProgressMs = duration - newRemainder
          this.updateProgress(newProgressMs, duration)
        } else {
          this.updateProgress(1, 1)
          clearInterval(this.trackTimer)
          this.getNowPlaying()
        }
      }, 100)
    },
    beforeDestroy() {
      clearInterval(this.staleTimer)
      clearInterval(this.trackTimer)
    },
  },
}
</script>
