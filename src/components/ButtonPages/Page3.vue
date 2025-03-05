<template>
  <v-row>
    <template v-if="buttonStore.serverSide === 'left'">
      <Page3Left />
    </template>
    <template v-if="buttonStore.serverSide === 'right'">
      <Page3Right />
    </template>
  </v-row>
</template>

<script>
import { useButtonStore } from "@/stores/buttonStores";
import Page3Left from "./PagePieces/Page3Left.vue";
import Page3Right from "./PagePieces/Page3Right.vue";

export default {
  setup() {
    const buttonStore = useButtonStore();
    return { buttonStore };
  },
};
</script>

