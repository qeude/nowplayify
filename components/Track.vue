<template>
  <div class="flex flex-row flex-grow items-center">
    <div class="text-white font-extrabold w-8 text-xl">{{ position }}#</div>
    <TrackImage class="h-24 w-24 ml-3" :image="image" />
    <div class="ml-5 flex-1">
      <div
        class="uppercase tracking-tight font-extrabold text-left text-white break-normal text-lg"
      >
        {{ name }}
      </div>
      <div class="tracking-tight text-white text-left text-lg">
        {{ artistsList }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    track: {
      type: Object,
      default: null,
    },
    position: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    name() {
      return this.track.name || ''
    },
    image() {
      const album = this.track.album
      const image = this.track.image
      if (album) {
        const { url } = album.images[0]
        return url
      }
      return image || 'https://i.imgur.com/r8vPsMN.jpg'
    },
    artistsList() {
      const artists = this.track.artists || null
      return artists
        ? artists.map((artist) => artist.name).join(', ')
        : 'Nothing is currently playing.'
    },
  },
}
</script>
