<template>
  <div class="flex items-center justify-between p-10">
    <TrackImage
      class="h-72 w-72 flex-none"
      :class="className"
      :progress-percent="progress"
      :image="image"
    />
    <div class="ml-10 flex flex-col items-start">
      <div
        class="uppercase tracking-tight font-extrabold text-5xl text-left text-white break-normal"
      >
        {{ name }}
      </div>
      <div
        class="tracking-tight font-semibold text-3xl text-white text-left w-auto inline-block"
      >
        {{ artistsList }}
      </div>
    </div>
  </div>
</template>

<script>
import TrackImage from './TrackImage.vue'

export default {
  components: { TrackImage },
  props: ['isPlaying', 'nowPlaying'],
  data() {
    return { staleTimer: '', trackTimer: '' }
  },
  computed: {
    className() {
      return this.isPlaying ? '' : 'is-paused'
    },
    name() {
      return this.nowPlaying.name
    },
    image() {
      const { album, image } = this.nowPlaying
      if (album) {
        const { url } = album.images[0]
        return url
      }
      return image || 'https://i.imgur.com/r8vPsMN.jpg'
    },
    progress() {
      return this.$store.state.trackProgress.toFixed(2)
    },
    artistsList() {
      const { artists } = this.nowPlaying
      return artists
        ? artists.map((artist) => artist.name).join(', ')
        : 'Nothing is currently playing.'
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
        if (newNow < until + 1000) {
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
