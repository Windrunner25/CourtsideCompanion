<template>
  <v-row>
    <!-- First Column -->
    <v-col cols="6">
      <div style="display: flex; justify-self: center">
        {{ matchInfoStore.player1FirstName }} hit a(n)...
      </div>
      <v-container class="pa-0">
        <v-row>
          <v-col cols="12">
            <v-btn
              @click="handleClick(7, 'Winner', 1)"
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
              @click="handleClick(7, 'Unforced Error', 2)"
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
              @click="handleClick(7, 'Forced Error', 2)"
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
      <div style="display: flex; justify-self: center">
        {{ matchInfoStore.player2FirstName }} hit a(n)...
      </div>

      <v-container class="pa-0">
        <v-row>
          <v-col cols="12">
            <v-btn
              @click="handleClick(7, 'Winner', 2)"
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
              @click="handleClick(7, 'Unforced Error', 1)"
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
              @click="handleClick(7, 'Forced Error', 1)"
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
import { useMatchInfoStore } from "@/stores/matchInfoStore";

export default {
  setup() {
    const buttonStore = useButtonStore();
    const scoreStore = useMatchScoreStore();
    const matchInfoStore = useMatchInfoStore();
    return { buttonStore, scoreStore, matchInfoStore };
  },
  methods: {
    handleClick(page, input, winner) {
      this.buttonStore.togglePage(page);

      this.scoreStore.currentPoint["Point End"] = input;

      this.scoreStore.currentPoint["Point Winner"] =
        this.matchInfoStore.getPlayerNameFromNumber(winner);

      this.scoreStore.setTemporaryPointWinner(winner);
    },
  },
};
</script>
