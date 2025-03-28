<template>
  <ShotIntent />
  <ShotSide />
  <ShotType />
  <ShotDirection />
  <ErrorLocation />
  <RallyLength />
</template>

<script setup lang="ts">
import RallyLength from "./ShotCharacteristics/RallyLength.vue";
import ErrorLocation from "./ShotCharacteristics/ErrorLocation.vue";
import ShotDirection from "./ShotCharacteristics/ShotDirection.vue";
import ShotIntent from "./ShotCharacteristics/ShotIntent.vue";
import ShotSide from "./ShotCharacteristics/ShotSide.vue";
import ShotType from "./ShotCharacteristics/ShotType.vue";
</script>
