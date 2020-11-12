<template>
  <div class="flex items-center justify-between p-10">
    <TrackImage class="h-72 w-72 flex-none" :class="className" :image="image" />
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
import { mapGetters } from 'vuex'
import TrackImage from './TrackImage.vue'

export default {
  components: { TrackImage },
  computed: {
    ...mapGetters('player', {
      playback: 'getPlayback',
      isPlaying: 'isPlaying',
      progressPercentage: 'getProgressPercentage',
    }),
    className() {
      return this.isPlaying ? '' : 'is-paused'
    },
    name() {
      return this.playback.item?.name || ''
    },
    image() {
      const album = this.playback.item?.album
      const image = this.playback.item?.image
      if (album) {
        const { url } = album.images[0]
        return url
      }
      return image || 'https://i.imgur.com/r8vPsMN.jpg'
    },
    artistsList() {
      const artists = this.playback.item?.artists || null
      return artists
        ? artists.map((artist) => artist.name).join(', ')
        : 'Nothing is currently playing.'
    },
  },
}
</script>
