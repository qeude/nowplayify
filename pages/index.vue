<template>
  <div class="bg-gray-900">
    <div class="container">
      <div>
        <NowPlaying :now-playing="track" :is-playing="isPlaying" />
      </div>
    </div>
  </div>
</template>

<script>
import NowPlaying from '~/components/NowPlaying.vue'
export default {
  components: { NowPlaying },
  computed: {
    showTrack() {
      return this.isConnected && this.track
    },
    nowPlaying() {
      if (
        this.$store.state.nowPlaying &&
        Object.keys(this.$store.state.nowPlaying).length !== 0
      ) {
        this.$store.dispatch('updateConnection', true)
        return this.$store.state.nowPlaying
      }
      return this.$store.state.recentlyPlayed
    },
    track() {
      return this.nowPlaying
    },
    isPlaying() {
      return this.$store.state.isPlaying
    },
    isConnected() {
      return this.$store.state.isConnected
    },
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
