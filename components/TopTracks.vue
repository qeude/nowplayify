<template>
  <div class="p-5">
    <div class="text-3xl text-white font-extrabold p-5">
      Last month top tracks
    </div>
    <div class="grid grid-cols-2 grid-rows-5 grid-flow-col">
      <Track
        v-for="(track, index) in tracks"
        :key="track"
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
