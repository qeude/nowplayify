<template>
  <div
    class="flex content-center flex-wrap w-full rounded-3xl border-solid border border-white mt-2 h-3"
  >
    <div :style="style" class="ml-1 mr-1 rounded-3xl bg-white h-1"></div>
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
