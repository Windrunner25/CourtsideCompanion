<template>
  <v-row>
    <template v-if="buttonStore.serverSide === 'left'">
      <Page2Left />
    </template>
    <template v-if="buttonStore.serverSide === 'right'">
      <Page2Right />
    </template>
  </v-row>
</template>

<script>
import { useButtonStore } from "@/stores/buttonStores";
import Page2Left from "./PagePieces/Page2Left.vue";
import Page2Right from "./PagePieces/Page2Right.vue";

export default {
  setup() {
    const buttonStore = useButtonStore();
    return { buttonStore };
  },
  data() {
    return {};
  },
};
</script>

<style></style>
