<template>
  <Renderer
    ref="renderer"
    :orbit-ctrl="{
      autoRotate: false,
      enableDamping: true,
      dampingFactor: 0.05,
    }"
    resize="window"
    antialias
    :pointer="{ intersectRecursive: true }"
    alpha="0"
  >
    <Camera ref="camera" :position="{ z: 500, y: 250 }" />

    <Scene background="#5743BB">
      <PointLight :intensity="3" :position="{ x: 0, y: 400, z: 0 }">
        <Sphere :radius="0" />
      </PointLight>
      <PointLight :intensity="2" :position="{ x: 0, y: 0, z: 1000 }">
        <Sphere :radius="0" />
      </PointLight>
      <Box ref="moin" :width="50" :height="30">
        <StandardMaterial :color="boxColor" />
      </Box>
      <Raycaster intersect-recursive />
      <GltfModel
        ref="tisch"
        src="../public/Tisch_PC/scene.gltf"
        @load="onReady"
        @pointerOver="onPointerEvent"
      />
      <GltfModel
        src="../public/Charlie/charlie.gltf"
        @load="onReady"
        :position="{ x: 90, y: 0, z: 45 }"
        :scale="{ x: 8, y: 8, z: 8 }"
      />
    </Scene>
    <EffectComposer>
      <RenderPass />
    </EffectComposer>
  </Renderer>
</template>

<script>
import {
  StandardMaterial,
  EffectComposer,
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
    StandardMaterial,
    EffectComposer,
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
  data() {
    return {
      boxColor: "#ffffff",
      cameraToggle: true,
    };
  },

  methods: {
    onPointerEvent() {
      console.log("hi");
      this.boxColor = "#5743BB";
      this.cameraToggle = false;
      console.log("moin");
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
    scene.fog = new Fog(0xa0a0a0, 200, 1000);
  },
};
</script>
