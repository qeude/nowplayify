<template>
  <div class="bg-black">
    <div class="container">
      <div>
        <NowPlaying />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NowPlaying from '~/components/NowPlaying.vue'

export default {
  components: {
    NowPlaying,
  },
  computed: {
    ...mapGetters({
      notFound: 'app/notFound',
    }),
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions({
      refreshToken: 'auth/refreshAccessToken',
      init: 'app/init',
    }),
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
