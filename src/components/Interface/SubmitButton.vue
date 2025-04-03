<template>
  <div v-show="buttonStore.page === 7">
    <v-btn
      block
      class="text-none"
      variant="tonal"
      color="primary"
      @click="submitPoint"
    >
      Submit Point
    </v-btn>
  </div>
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
  data() {
    return {};
  },
  methods: {
    submitPoint() {
      if (this.buttonStore.group1Active !== null) {
        this.scoreStore.currentPoint["Stroke Intent"] =
          this.buttonStore.group1Active;
      }
      if (this.buttonStore.group2Active !== null) {
        this.scoreStore.currentPoint["Stroke Side"] =
          this.buttonStore.group2Active;
      }
      if (this.buttonStore.group3Active !== null) {
        this.scoreStore.currentPoint["Stroke Type"] =
          this.buttonStore.group3Active;
      }
      if (this.buttonStore.group4Active !== null) {
        this.scoreStore.currentPoint["Stroke Direction"] =
          this.buttonStore.group4Active;
      }
      if (this.buttonStore.group5Active !== null) {
        this.scoreStore.currentPoint["Error Location"] =
          this.buttonStore.group5Active;
      }
      if (this.buttonStore.group6Active !== null) {
        this.scoreStore.currentPoint["Rally Length"] =
          this.buttonStore.group6Active;
      }

      this.scoreStore.pointEnded();

      this.buttonStore.resetShotCharacteristics();
      this.buttonStore.togglePage(1);
    },
  },
};
</script>
