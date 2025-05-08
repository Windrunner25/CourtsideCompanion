<template>
    <v-container v-if="user.loading" fluid class="loading-screen">
      <v-progress-circular indeterminate color="black" class="centered" />
    </v-container>
  </template>

<script setup>
import { useUserStore } from "@/stores/userStore";

const user = useUserStore();
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #000000, #29333a);
  color: #f4f4f4;
  font-family: "Orbitron", sans-serif;
  z-index: 9999;
  opacity: 0.2;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>