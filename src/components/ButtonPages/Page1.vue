<template>
  <v-row>
    <template v-if="buttonStore.serverSide === 'left'">
      <Page1Left />
    </template>
    <template v-if="buttonStore.serverSide === 'right'">
      <Page1Right />
    </template>
  </v-row>
</template>

<script setup>
import { useButtonStore } from "@/stores/buttonStores"; // Import your Pinia store
import { useMatchScoreStore } from "@/stores/matchScoreStore";
import Page1Left from "./PagePieces/Page1Left.vue";
import Page1Right from "./PagePieces/Page1Right.vue";

const buttonStore = useButtonStore(); // Use the store
const scoreStore = useMatchScoreStore();
</script>

<style scoped></style>
