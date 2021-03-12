<template>
  <div>
    <canvas id="canvas-basic"></canvas>
  </div>
</template>
<script>
import Granim from 'granim'
export default {
  name: 'granim',
  data() {
    return {
      GObj: Object
    }
  },
  mounted() {
    this.GObj = new Granim({
      element: '#canvas-basic',
      name: 'granim',
      direction: 'top-bottom',
      isPausedWhenNotInView: true,
      states: {
        "default-state": {
          gradients: [
            ['#ff9966', '#ff5e62'],
            ['#00F260', '#0575E6'],
            ['#e1eec3', '#f05053']
          ]
        }
      }
    })
  }
}
</script>
<style scoped>
#canvas-basic {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -10;
}
</style>
