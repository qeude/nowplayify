<template>
  <div class="flex flex-row flex-grow items-center p-24">
    <TrackImage class="h-64 w-64" :image="image" :blurred="!isPlaying" />
    <div class="ml-10 flex-1">
      <div
        class="uppercase tracking-tight font-extrabold text-5xl text-left text-white break-normal"
      >
        {{ name }}
      </div>
      <div
        class="tracking-tight font-semibold text-3xl text-white text-left w-auto inline-block pb-4"
      >
        {{ artistsList }}
      </div>
      <ProgressBar />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TrackImage from './TrackImage.vue'
import ProgressBar from './ProgressBar.vue'

export default {
  components: { TrackImage, ProgressBar },
  computed: {
    ...mapGetters('player', {
      playback: 'getPlayback',
      isPlaying: 'isPlaying',
      progressPercentage: 'getProgressPercentage',
    }),
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
