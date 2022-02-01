<template>
  <Renderer
    ref="renderer"
    :orbit-ctrl="{ autoRotate: true, enableDamping: true, dampingFactor: 0.05 }"
    resize="window"
    antialias
    pointer
    alpha="0"
  >
    <Camera ref="camera" :position="{ z: 300, x: 1000 }" />
    <Scene background="#5743BB">
      <PointLight :intensity="3" :position="{ x: 0, y: 400, z: 0 }">
        <Sphere :radius="0" />
      </PointLight>
      <PointLight :intensity="2" :position="{ x: 0, y: 0, z: 1000 }">
        <Sphere :radius="0" />
      </PointLight>

      <GltfModel
        ref="tisch"
        src="../public/Tisch_PC/scene.gltf"
        @load="onReady"
      />
    </Scene>
    <EffectComposer>
      <RenderPass />
      <UnrealBloomPass :strength="0.3" />
      <FXAAPass />
    </EffectComposer>
  </Renderer>
</template>

<script>
import {
  FXAAPass,
  UnrealBloomPass,
  RenderPass,
  Sphere,
  PointLight,
  Group,
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
    FXAAPass,
    UnrealBloomPass,
    RenderPass,
    Sphere,
    PointLight,
    Group,
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
    const box = this.$refs.box.mesh;
    const light = this.$refs.light.light;
    const pointerV3 = renderer.three.pointer.positionV3;
  },
};
</script>

<style>
#app {
  background-image: url("./assets/logo.png");
}
</style>
