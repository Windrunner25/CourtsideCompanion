<template>
  <ShotIntent />
  <ShotSide />
  <ShotType />
  <ShotDirection />
  <ErrorLocation />
  <RallyLength />
</template>

<script setup lang="ts">
import RallyLength from "./RallyLength.vue";
import ErrorLocation from "./ErrorLocation.vue";
import ShotDirection from "./ShotDirection.vue";
import ShotIntent from "./ShotIntent.vue";
import ShotSide from "./ShotSide.vue";
import ShotType from "./ShotType.vue";
</script>
