<!-- Server on right -->
<!-- First Column -->
<template>
  <v-col cols="6">
    <v-container class="pa-0">
      <v-row>
        <v-col cols="12">
          <v-btn
            @click="handleReturn(4, 'Return Winner')"
            block
            class="text-none"
            variant="tonal"
            color="primary"
            style="height: 156px; margin: 0; background-color: #c0e4c0"
            >Return Winner</v-btn
          >
        </v-col>
      </v-row>
    </v-container>

    <v-container class="pa-0">
      <v-row>
        <v-col cols="12">
          <v-btn
            @click="handleReturn(5, 'Return Error')"
            block
            class="text-none"
            variant="tonal"
            color="primary"
            style="height: 156px; margin: 0; background-color: #ffc1c1"
            >Return Error</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-col>
  <v-col cols="6">
    <v-container class="pa-0">
      <v-row>
        <v-col cols="12">
          <v-btn
            block
            @click="handleServe(2)"
            class="text-none"
            variant="tonal"
            color="primary"
            style="height: 100px; margin: 0; background-color: #c0e4c0"
            >Serve In</v-btn
          >
        </v-col>
      </v-row>
    </v-container>

    <v-container class="pa-0">
      <v-row>
        <v-col cols="12">
          <v-btn
            @click="handleFault"
            block
            class="text-none"
            variant="tonal"
            color="primary"
            style="height: 100px; margin: 0; background-color: #ffc1c1"
            >Fault<FaultEmoji
          /></v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="pa-0">
      <v-row>
        <v-col cols="12">
          <v-btn
            block
            @click="handleAce"
            class="text-none"
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
import { useButtonStore } from "@/stores/buttonStores"; // Import your Pinia store
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
    // handle serve in, fault, ace
    handleServe(page) {
      if (!this.scoreStore.secondServe) {
        this.scoreStore.currentPoint["Serve"] = "First Serve";
        this.scoreStore.currentPoint["Server"] =
          this.matchInfoStore.player2FullName;
        this.buttonStore.togglePage(page);
      } else {
        this.scoreStore.currentPoint["Serve"] = "Second Serve";
        this.scoreStore.currentPoint["Server"] =
          this.matchInfoStore.player2FullName;
        this.buttonStore.togglePage(page);
      }
    },
    handleFault() {
      if (this.scoreStore.secondServe === true) {
        this.scoreStore.currentPoint["Serve"] = "Double Fault";
        this.scoreStore.currentPoint["Point End"] = "Double Fault";
        this.scoreStore.currentPoint["Server"] =
          this.matchInfoStore.player2FullName;
        this.scoreStore.currentPoint["Point Winner"] =
          this.matchInfoStore.player1FullName;
        this.scoreStore.pointEnded();
      }
      this.scoreStore.fault(1);
    },
    handleAce() {
      if (!this.scoreStore.secondServe) {
        this.scoreStore.currentPoint["Serve"] = "First Serve";
      } else {
        this.scoreStore.currentPoint["Serve"] = "Second Serve";
      }
      this.scoreStore.currentPoint["Point End"] = "Ace";
      this.scoreStore.currentPoint["Server"] =
        this.matchInfoStore.player2FullName;
      this.buttonStore.togglePage(3);
    },
    handleReturn(page, input) {
      if (!this.scoreStore.secondServe) {
        this.scoreStore.currentPoint["Serve"] = "First Serve";
      } else {
        this.scoreStore.currentPoint["Serve"] = "Second Serve";
      }
      this.scoreStore.currentPoint["Point End"] = input;
      this.scoreStore.currentPoint["Rally Length"] = "1-5";
      this.buttonStore.togglePage(page);
    },
  },
};
</script>
