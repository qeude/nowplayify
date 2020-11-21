<template>
  <div class="rounded-3xl sm:rounded-xl overflow-hidden">
    <img :src="image" :class="imageClass" />
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: 'https://i.imgur.com/r8vPsMN.jpg',
    },
    blurred: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    imageClass() {
      return this.blurred ? 'blurred' : ''
    },
  },
}
</script>

<style scoped>
.blurred {
  filter: blur(5px);
  transition: all 600ms ease-out;
}

img {
  filter: blur(0px);
  transition: all 600ms ease-out;
}
</style>
