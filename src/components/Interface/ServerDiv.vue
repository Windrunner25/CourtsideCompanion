<template>
  <div>
    {{ serverName }}
  </div>
  <div v-if="buttonStore.serverSide === side">🎾</div>
</template>

<script>
import { useButtonStore } from "@/stores/buttonStores";

export default {
  setup() {
    const buttonStore = useButtonStore();
    return { buttonStore };
  },
  props: {
    serverName: String,
    side: String, 
  },
};
</script>
