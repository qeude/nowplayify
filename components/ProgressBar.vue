<template>
  <div
    :class="borderClass"
    class="flex content-center flex-wrap w-full rounded-3xl border-solid border border-white mt-2"
  >
    <div
      :style="style"
      :class="lineClass"
      class="ml-1 mr-1 rounded-3xl bg-white"
    ></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    height: {
      type: Number,
      default: 3,
    },
  },
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
    borderClass() {
      return `h-${this.height}`
    },
    lineClass() {
      return `h-${this.height - 2}`
    },
  },
}
</script>
