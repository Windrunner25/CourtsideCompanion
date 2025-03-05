<template>
  <v-row>
    <template v-if="buttonStore.serverSide === 'left'">
      <Page4Left />
    </template>
    <template v-if="buttonStore.serverSide === 'right'">
      <Page4Right />
    </template>
  </v-row>
</template>

<script>
import { useButtonStore } from "@/stores/buttonStores";
import Page4Left from "./PagePieces/Page4Left.vue";
import Page4Right from "./PagePieces/Page4Right.vue";

export default {
  setup() {
    const buttonStore = useButtonStore();
    return { buttonStore };
  },
};
</script>
