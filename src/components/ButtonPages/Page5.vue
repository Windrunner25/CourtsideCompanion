<template>
  <v-row>
    <template v-if="buttonStore.serverSide === 'left'">
      <Page5Left />
    </template>
    <template v-if="buttonStore.serverSide === 'right'">
      <Page5Right />
    </template>
  </v-row>
</template>

<script>
import { useButtonStore } from "@/stores/buttonStores";
import Page5Right from "./PagePieces/Page5Right.vue";
import Page5Left from "./PagePieces/Page5Left.vue";

export default {
  setup() {
    const buttonStore = useButtonStore();
    return { buttonStore };
  },
};
</script>

<style></style>
