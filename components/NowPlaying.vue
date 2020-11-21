<template>
  <div class="flex flex-row items-center">
    <TrackImage
      :image="image"
      :blurred="!isPlaying"
      class="flex-initial"
      :class="trackImageClasses"
    />
    <div class="ml-5 flex-1">
      <div
        class="uppercase tracking-tight font-extrabold text-left text-white break-normal"
        :class="nameClasses"
      >
        {{ name }}
      </div>
      <div class="tracking-tight text-white text-left" :class="artistsClasses">
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
    size: {
      type: String,
      default: 'small',
      validator: (value) => ['small', 'large'].includes(value),
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
    trackImageClasses() {
      return this.size === 'small' ? 'h-20 w-20' : 'h-64 w-64'
    },
    nameClasses() {
      return this.size === 'small' ? 'text-lg' : 'text-4xl'
    },
    artistsClasses() {
      return this.size === 'small' ? 'text-lg' : 'text-3xl'
    },
  },
}
</script>
<style>
.name {
  font-size: 3vh;
}
.artists {
  font-size: 2vh;
}
</style>
