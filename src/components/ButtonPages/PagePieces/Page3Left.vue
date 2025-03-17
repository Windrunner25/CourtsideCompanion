<template>
  <v-col cols="6">
    <v-container class="pa-0">
      <v-row>
        <v-col cols="12">
          <v-btn
            @click="handleServe(1, 'Wide')"
            block
            class="text-none"
            variant="tonal"
            color="primary"
            style="height: 63px; margin: 0"
            >Wide</v-btn
          >
        </v-col>
      </v-row>
    </v-container>

    <v-container class="pa-0">
      <v-row>
        <v-col cols="12">
          <v-btn
            @click="handleServe(1, 'Body')"
            block
            class="text-none"
            variant="tonal"
            color="primary"
            style="height: 63px; margin: 0"
            >Body</v-btn
          >
        </v-col>
      </v-row>
    </v-container>

    <v-container class="pa-0">
      <v-row>
        <v-col cols="12">
          <v-btn
            @click="handleServe(1, 'T')"
            block
            class="text-none"
            variant="tonal"
            color="primary"
            style="height: 63px; margin: 0"
            >T</v-btn
          >
        </v-col>
      </v-row>
    </v-container>

    <v-container class="pa-0">
      <v-row>
        <v-col cols="12">
          <v-btn
            class="text-none"
            block
            variant="tonal"
            color="primary"
            style="height: 100px; margin: 0; background-color: #c0e4c0"
            >Ace</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<script>
import { useButtonStore } from "@/stores/buttonStores";
import { useMatchScoreStore } from "@/stores/matchScoreStore";
import { useMatchInfoStore } from "@/stores/matchInfoStore";

export default {
  setup() {
    const buttonStore = useButtonStore();
    const scoreStore = useMatchScoreStore();
    const matchInfoStore = useMatchInfoStore();
    return { buttonStore, scoreStore, matchInfoStore };
  },
  methods: {
    handleServe(page, serveLocation) {
      this.scoreStore.currentPoint["Serve Location"] = serveLocation;
      this.scoreStore.pointEnded(this.matchInfoStore.player1FullName, this.matchInfoStore.player1FullName);
      this.scoreStore.incrementScore(1);
      this.buttonStore.togglePage(page);
    },
  },
};
</script>
