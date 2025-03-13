<template>
  <div v-show="buttonStore.page === 7 || buttonStore.page === 8">
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
    submitPoint() {
      this.scoreStore.currentPoint["Stroke Intent"] =
        this.buttonStore.group1LeftActive;
      this.scoreStore.currentPoint["Stroke Side"] =
        this.buttonStore.group2LeftActive;
      this.scoreStore.currentPoint["Stroke Type"] =
        this.buttonStore.group3LeftActive;
      this.scoreStore.currentPoint["Stroke Direction"] =
        this.buttonStore.group4LeftActive;
      this.scoreStore.currentPoint["Error Location"] =
        this.buttonStore.group5LeftActive;
        
      this.buttonStore.resetShotCharacteristics(this.buttonStore.getPage);
      this.scoreStore.addPoint(this.scoreStore.currentPoint);
      this.scoreStore.resetCurrentPointFields();
      this.buttonStore.togglePage(1);
    },
  },
};
</script>
