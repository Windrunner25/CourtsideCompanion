<template>
  <div style="display: flex; justify-content: left; padding-left: 15px;">
    {{ serverName }}
    <div v-if="scoreStore.playerServing === server">🎾</div>
  </div>
</template>

<script>
import { useButtonStore } from "@/stores/buttonStores";
import { useMatchScoreStore } from "@/stores/matchScoreStore";

export default {
  setup() {
    const buttonStore = useButtonStore();
    const scoreStore = useMatchScoreStore();
    return { buttonStore, scoreStore };
  },
  props: {
    serverName: String,
    server: Number,
  },
};
</script>
