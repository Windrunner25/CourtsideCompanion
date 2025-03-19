<template>
  <v-btn
    @click="increasePlayerGameScore(1)"
    block
    class="text-none"
    variant="tonal"
    color="primary"
    style="height: 63px; margin: 0"
    >Increase Player 1 Score
  </v-btn>

  <v-btn
    @click="increasePlayerGameScore(2)"
    block
    class="text-none"
    variant="tonal"
    color="primary"
    style="height: 63px; margin: 0"
    >Increase Player 2 Score

  </v-btn>

  <v-btn
    @click="decreasePlayerGameScore(1)"
    block
    class="text-none"
    variant="tonal"
    color="primary"
    style="height: 63px; margin: 0"
    >Decrease Player 1 Score

  </v-btn>
  <v-btn
    @click="decreasePlayerGameScore(2)"
    block
    class="text-none"
    variant="tonal"
    color="primary"
    style="height: 63px; margin: 0"
    >Decrease Player 2 Score

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
};
</script>
