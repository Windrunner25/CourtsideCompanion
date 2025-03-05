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

<script>
import { useButtonStore } from "@/stores/buttonStores";
import Page1Left from "./PagePieces/Page1Left.vue";
import Page1Right from "./PagePieces/Page1Right.vue";

export default {
  setup() {
    const buttonStore = useButtonStore();
    return { buttonStore };
  },
};
</script>
