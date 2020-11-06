<template>
  <div aria-hidden="true">
    <svg
      class="album rounded-3xl"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <defs>
        <pattern
          id="image"
          x="0%"
          y="0%"
          height="100%"
          width="100%"
          patternUnits="userSpaceOnUse"
        >
          <image
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            v-bind="{ 'xlink:href': image }"
          ></image>
        </pattern>
      </defs>
      <rect height="25" width="25" class="image" x="0" y="0"></rect>
    </svg>
    <svg
      class="progress rounded-3xl"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#4ac571"></stop>
          <stop offset="25%" stop-color="#4ac571"></stop>
          <stop offset="90%" stop-color="#1DB954"></stop>
          <stop offset="100%" stop-color="#1DB954"></stop>
        </linearGradient>
      </defs>
      <rect
        class="bar"
        :stroke-dasharray="`${progressPercent} 100`"
        fill="none"
        x="0"
        y="0"
        rx="3"
        height="25"
        width="25"
      ></rect>
    </svg>
  </div>
</template>

<script>
export default {
  props: ['progressPercent', 'image'],
}
</script>

<style scoped>
div {
  filter: grayscale(0);
  transition: all 600ms ease-out;
}
.is-paused {
  filter: grayscale(90%);
  transition: all 600ms ease-out;
}
svg {
  height: 100%;
  width: 100%;
}
svg.progress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.bar {
  stroke: url(#gradient);
  stroke-width: 0.15em;
  transform: rotate(0deg);
  transform-origin: center;
  animation: fill 2s reverse;
}

.image {
  fill: url(#image);
}

@keyframes fill {
  to {
    stroke-dasharray: 0 100;
  }
}
</style>
