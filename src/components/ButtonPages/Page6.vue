<template>
  <v-row>
    <!-- First Column -->
    <v-col cols="6">
      <v-container class="pa-0">
        <v-row>
          <v-col cols="12">
            <v-btn
              @click="player1winner"
              block
              class="text-none"
              variant="tonal"
              color="primary"
              style="height: 100px; margin: 0; background-color: #c0e4c0"
              >Winner</v-btn
            >
          </v-col>
        </v-row>
      </v-container>

      <v-container class="pa-0">
        <v-row>
          <v-col cols="12">
            <v-btn
              @click="player1error"
              block
              class="text-none"
              variant="tonal"
              color="primary"
              style="height: 100px; margin: 0; background-color: #ffc1c1"
              >Unforced Error</v-btn
            >
          </v-col>
        </v-row>
      </v-container>

      <v-container class="pa-0">
        <v-row>
          <v-col cols="12">
            <v-btn
              @click="player1error"
              block
              class="text-none"
              variant="tonal"
              color="primary"
              style="height: 100px; margin: 0; background-color: #ffc1c1"
              >Forced Error</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-col>
    <!-- Second Column -->
    <v-col cols="6">
      <v-container class="pa-0">
        <v-row>
          <v-col cols="12">
            <v-btn
              @click="player2winner"
              block
              class="text-none"
              variant="tonal"
              color="primary"
              style="height: 100px; margin: 0; background-color: #c0e4c0"
              >Winner</v-btn
            >
          </v-col>
        </v-row>
      </v-container>

      <v-container class="pa-0">
        <v-row>
          <v-col cols="12">
            <v-btn
              @click="player2error"
              block
              class="text-none"
              variant="tonal"
              color="primary"
              style="height: 100px; margin: 0; background-color: #ffc1c1"
              >Unforced Error</v-btn
            >
          </v-col>
        </v-row>
      </v-container>

      <v-container class="pa-0">
        <v-row>
          <v-col cols="12">
            <v-btn
              @click="player2error"
              block
              class="text-none"
              variant="tonal"
              color="primary"
              style="height: 100px; margin: 0; background-color: #ffc1c1"
              >Forced Error</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
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
  data() {
    return {};
  },
  methods: {
    player1winner() {
      this.scoreStore.incrementScore(1);
      this.buttonStore.togglePage(7);
    },
    player1error() {
      this.scoreStore.incrementScore(2);
      this.buttonStore.togglePage(7);
    },
    player2winner() {
      this.scoreStore.incrementScore(2);
      this.buttonStore.togglePage(8);
    },
    player2error() {
      this.scoreStore.incrementScore(1);
      this.buttonStore.togglePage(8);
    },
  },
};
</script>

<style></style>
