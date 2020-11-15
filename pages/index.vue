<template>
  <div class="h-screen bg-black">
    <div class="container mx-auto h-full flex items-center">
      <NowPlaying />
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
      init: 'app/init',
    }),
  },
}
</script>

<style></style>
