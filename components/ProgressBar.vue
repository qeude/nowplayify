<template>
  <div
    class="flex content-center flex-wrap w-full h-4 rounded-3xl border-solid border border-white"
  >
    <div :style="style" class="h-2 ml-1 mr-1 rounded-3xl bg-white"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('player', {
      progressPercentage: 'getProgressPercentage',
    }),
    progress() {
      return this.progressPercentage
    },
    style() {
      return `width: ${this.progressPercentage}%`
    },
  },
}
</script>
