<template>
  <Renderer ref="renderer" orbit-ctrl="true" resize="window" antialias>
    <Camera ref="camera" :position="{ z: 400, x: 1000 }" />
    <Scene background="#5743BB">
      <RectAreaLight color="#ff6000" :position="{ x: 0, y: 10, z: 1 }" />
      <GltfModel
        ref="tisch"
        src="../public/Tisch_PC/scene.gltf"
        @load="onReady"
        @click="onPointerEvent"
      />
      <Box @click="onPointerEvent">
        <LambertMaterial />
      </Box>
    </Scene>
  </Renderer>
</template>

<script>
import {
  Box,
  LambertMaterial,
  GltfModel,
  Camera,
  RectAreaLight,
  Renderer,
  Scene,
} from "troisjs";
export default {
  components: {
    Box,
    LambertMaterial,
    Camera,
    Renderer,
    Scene,
    RectAreaLight,
    GltfModel,
  },

  methods: {
    onPointerEvent() {
      console.log("hi");
    },
  },

  setup() {
    function onReady(e) {
      console.log("render is ready", e);
    }
    return {
      onReady,
    };
  },

  mounted() {
    const renderer = this.$refs.renderer;
    const camera = this.$refs.camera;
    const tisch = this.$refs.tisch;

    /*
    renderer.onBeforeRender(() => 
      camera.lookAt(tisch);
    });

*/
  },
};
</script>

<style>
#app {
  background-image: url("./assets/logo.png");
}
</style>
