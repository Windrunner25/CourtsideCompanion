<template>
  <div v-if="!scoreStore.secondServe">
    <v-icon>mdi-tennis-ball</v-icon><v-icon>mdi-tennis-ball</v-icon>
  </div>
  <div v-else>
    <v-icon>mdi-tennis-ball</v-icon>
  </div>
</template>

<script>
import { useButtonStore } from "@/stores/buttonStores"; // Import your Pinia store
import { useMatchScoreStore } from "@/stores/matchScoreStore";

export default {
  setup() {
    const scoreStore = useMatchScoreStore();
    return { scoreStore };
  },
};
</script>
