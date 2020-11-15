<template>
  <div class="h-screen bg-black">
    <div class="container mx-auto h-full flex flex-col">
      <NowPlaying :class="nowPlayingClasses" :height="nowPlayingHeight" />
      <TopTracks v-if="!isPlaying" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NowPlaying from '~/components/NowPlaying.vue'
import TopTracks from '~/components/TopTracks.vue'
export default {
  components: {
    NowPlaying,
    TopTracks,
  },
  computed: {
    ...mapGetters({
      notFound: 'app/notFound',
      isPlaying: 'player/isPlaying',
    }),
    nowPlayingClasses() {
      return this.isPlaying ? 'p-24' : 'transform self-end pr-10'
    },
    nowPlayingHeight() {
      return this.isPlaying ? '64' : '20'
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions({
      init: 'app/init',
    }),
  },
}
</script>

<style></style>
