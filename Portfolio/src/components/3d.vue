<template>
  <Renderer
    ref="renderer"
    :orbit-ctrl="{
      autoRotate: false,
      enableDamping: true,
      dampingFactor: 0.05,
    }"
    width="800"
    height="1000"
    antialias
    :pointer="{ intersectRecursive: true }"
    alpha="0"
  >
    <Camera ref="camera" :position="{ z: 500, y: 250 }" />

    <Scene background="#000000">
      <PointLight :intensity="3" :position="{ x: 0, y: 400, z: 0 }">
        <Sphere :radius="0" />
      </PointLight>
      <PointLight :intensity="2" :position="{ x: 0, y: 0, z: 1000 }">
        <Sphere :radius="0" />
      </PointLight>
      <Plane :width="75" :height="30" :position="{ x: 0, y: 100, z: -13 }">
        <StandardMaterial :color="boxColor">
          <Texture src="../public/Textures/vs.png" />
        </StandardMaterial>
      </Plane>
      <Sphere
        ref="mond"
        :radius="50"
        :scale="{ x: 10, y: 10, z: 10 }"
        :position="{ x: 1000, y: 0, z: -1000 }"
        :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }"
      >
        <BasicMaterial>
          <Texture src="../public/Textures/test.jpg" />
        </BasicMaterial>
      </Sphere>

      <InstancedMesh
        ref="imesh"
        :count="NUM_INSTANCES"
        :cast-shadow="true"
        :receive-shadow="true"
      >
        <SphereGeometry :radius="1" />
        <PhongMaterial />
      </InstancedMesh>

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
import { Object3D, MathUtils } from "three";

import {
  InstancedMesh,
  Texture,
  BasicMaterial,
  SphereGeometry,
  PhongMaterial,
  ShaderMaterial,
  Plane,
  StandardMaterial,
  EffectComposer,
  RenderPass,
  Sphere,
  PointLight,
  Group,
  Box,
  Text,
  LambertMaterial,
  GltfModel,
  Camera,
  RectAreaLight,
  Renderer,
  Scene,
} from "troisjs";

export default {
  components: {
    Text,
    InstancedMesh,
    Texture,
    BasicMaterial,
    SphereGeometry,
    PhongMaterial,
    ShaderMaterial,
    Plane,
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
      count: 500,
    };
  },

  methods: {
    init() {},

    onPointerEvent() {
      console.log("hi");
      this.boxColor = "#5743BB";
      this.cameraToggle = false;
      console.log("moin");
    },
  },

  setup() {
    return {
      NUM_INSTANCES: 2000,
    };
  },

  mounted() {
    // init instanced mesh matrix
    const imesh = this.$refs.imesh.mesh;
    const dummy = new Object3D();
    const { randFloat: rnd, randFloatSpread: rndFS } = MathUtils;

    const renderer = this.$refs.renderer;
    const mond = this.$refs.mond.mesh;

    renderer.onBeforeRender(() => {
      mond.rotation.x += 0.003;
    });

    for (let i = 0; i < this.NUM_INSTANCES; i++) {
      dummy.position.set(rndFS(2000), rndFS(2000), rndFS(2000));
      const scale = rnd(0.2, 0.5);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      imesh.setMatrixAt(i, dummy.matrix);
    }
    imesh.instanceMatrix.needsUpdate = true;
  },
};
</script>
