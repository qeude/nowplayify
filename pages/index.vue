<template>
  <div class="h-screen bg-black">
    <div class="container h-full mx-auto flex flex-col justify-center">
      <NowPlaying :class="nowPlayingClasses" />
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
      return this.isPlaying
        ? 'h-64 m-24'
        : 'self-end sm:pl-10 sm:pr-10 mt-5 mb-3 h-24 w-full md:w-1/2 lg:w-1/2'
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
