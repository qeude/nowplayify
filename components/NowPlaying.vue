<template>
  <div class="flex flex-row flex-grow items-center">
    <TrackImage :class="imageClasses" :image="image" :blurred="!isPlaying" />
    <div :class="margin">
      <div
        class="uppercase tracking-tight font-extrabold text-left text-white break-normal"
        :class="nameClasses"
      >
        {{ name }}
      </div>
      <div
        class="tracking-tight font-semibold text-white text-left w-auto inline-block"
        :class="[artistsClasses, padding]"
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
  props: {
    height: {
      type: Number,
      default: 64,
    },
  },
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
    imageClasses() {
      return `h-${this.height} w-${this.height}`
    },
    nameClasses() {
      return this.height >= 42 ? 'text-5xl' : ''
    },
    artistsClasses() {
      return this.height >= 42 ? 'text-3xl' : ''
    },
    padding() {
      return this.height >= 42 ? 'pt-4 pb-4' : 'pt-2 pb-3'
    },
    margin() {
      return this.height >= 42 ? 'ml-10' : 'ml-5'
    },
  },
}
</script>
