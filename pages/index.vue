<template>
  <div class="h-screen bg-black">
    <div class="container h-full mx-auto flex flex-col justify-center">
      <div
        :class="{ hidden: isPlaying }"
        class="text-xl text-white font-extrabold pl-10 mt-5"
      >
        Paused
      </div>
      <NowPlaying
        :class="nowPlayingClasses"
        :size="isPlaying ? 'large' : 'small'"
      />
      <TopTracks :class="{ hidden: isPlaying }" />
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
        ? 'm-24'
        : 'sm:pl-10 sm:pr-10 mt-2 mb-2 h-20 w-full md:w-1/2 lg:w-1/2'
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
