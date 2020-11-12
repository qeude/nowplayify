<template>
  <div class="flex items-center justify-between p-10">
    <h1 v-if="isPlaying" class="text-white text-7xl">Vue is awesome!</h1>
    <!-- <TrackImage
      class="h-72 w-72 flex-none"
      :class="className"
      :progress-percent="progress"
      :image="image"
    /> -->
    <div class="ml-10 flex flex-col items-start">
      <div
        class="uppercase tracking-tight font-extrabold text-5xl text-left text-white break-normal"
      >
        TUTU
        <!-- {{ name }} -->
      </div>
      <div
        class="tracking-tight font-semibold text-3xl text-white text-left w-auto inline-block"
      >
        TOTO
        <!-- {{ artistsList }} -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import TrackImage from './TrackImage.vue'

export default {
  components: {},
  props: ['nowPlaying'],
  data() {
    return { staleTimer: '', trackTimer: '' }
  },
  computed: {
    ...mapGetters('player', {
      playback: 'getPlayback',
      context: 'getPlaybackContext',
      isPlaying: 'isPlaying',
    }),
    className() {
      return this.isPlaying ? '' : 'is-paused'
    },
    // name() {
    //   return this.nowPlaying.name
    // },
    // image() {
    //   const { album, image } = this.nowPlaying
    //   if (album) {
    //     const { url } = album.images[0]
    //     return url
    //   }
    //   return image || 'https://i.imgur.com/r8vPsMN.jpg'
    // },
    // progress() {
    //   // return this.$store.state.trackProgress.toFixed(2)
    // },
    // artistsList() {
    //   const { artists } = this.nowPlaying
    //   return artists
    //     ? artists.map((artist) => artist.name).join(', ')
    //     : 'Nothing is currently playing.'
    // },
  },
  created() {},
  mounted() {},
  methods: {
    beforeDestroy() {
      clearInterval(this.staleTimer)
      clearInterval(this.trackTimer)
    },
  },
}
</script>
