<template>
  <v-btn
    @click="increasePlayerGameScore( player )"
    block
    class="text-none"
    variant="tonal"
    color="primary"
    style="height: 15px; width: 15px;"
    >+
  </v-btn>

  <v-btn
    @click="decreasePlayerGameScore( player )"
    block
    class="text-none"
    variant="tonal"
    color="primary"
    style="height: 15px; width: 15px;"
    >-
  </v-btn>
</template>

<script>
import { useMatchScoreStore } from "@/stores/matchScoreStore";
export default {
  setup() {
    const matchScoreStore = useMatchScoreStore();
    return { matchScoreStore };
  },
  methods: {
    increasePlayerGameScore(player) {
      this.matchScoreStore.incrementScore(player);
    },
    decreasePlayerGameScore(player) {
      this.matchScoreStore.decrementScore(player);
    },
  },
  props: {
    player: {
      type: Number,
      required: true,
    },
  },
};
</script>
