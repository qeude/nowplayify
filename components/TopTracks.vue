<template>
  <div class="pl-5 pr-5 pb-5 flex-grow items-center">
    <div class="text-3xl text-white font-extrabold pl-5 pb-5">
      Last month top tracks
    </div>
    <div class="grid grid-cols-2 grid-rows-5 grid-flow-col gap-2">
      <Track
        v-for="(track, index) in tracks"
        :key="track"
        class="h-16"
        :track="track"
        :position="index + 1"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Track from './Track.vue'

export default {
  components: {
    Track,
  },
  computed: {
    ...mapGetters('player', {
      topTracks: 'getTopTracks',
    }),
    tracks() {
      return this.topTracks || []
    },
  },
}
</script>
