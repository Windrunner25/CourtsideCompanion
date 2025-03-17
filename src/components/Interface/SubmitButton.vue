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
      if (this.buttonStore.page === 7) {
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

        if (this.scoreStore.currentPoint["Point End"] === "Winner") {
          if (this.buttonStore.serverSide === "left") {
            this.scoreStore.pointEnded(
              this.matchInfoStore.player1FullName,
              this.matchInfoStore.player1FullName
            );
          } else {
            this.scoreStore.pointEnded(
              this.matchInfoStore.player1FullName,
              this.matchInfoStore.player2FullName
            );
          }
        } else {
          if (this.buttonStore.serverSide === "right") {
            this.scoreStore.pointEnded(
              this.matchInfoStore.player2FullName,
              this.matchInfoStore.player2FullName
            );
          } else {
            this.scoreStore.pointEnded(
              this.matchInfoStore.player2FullName,
              this.matchInfoStore.player1FullName
            );
          }
        }
      } else {
        this.scoreStore.currentPoint["Stroke Intent"] =
          this.buttonStore.group1RightActive;
        this.scoreStore.currentPoint["Stroke Side"] =
          this.buttonStore.group2RightActive;
        this.scoreStore.currentPoint["Stroke Type"] =
          this.buttonStore.group3RightActive;
        this.scoreStore.currentPoint["Stroke Direction"] =
          this.buttonStore.group4RightActive;
        this.scoreStore.currentPoint["Error Location"] =
          this.buttonStore.group5RightActive;

        if (this.scoreStore.currentPoint["Point End"] === "Winner") {
          if (this.buttonStore.serverSide === "left") {
            this.scoreStore.pointEnded(
              this.matchInfoStore.player2FullName,
              this.matchInfoStore.player1FullName
            );
          } else {
            this.scoreStore.pointEnded(
              this.matchInfoStore.player2FullName,
              this.matchInfoStore.player2FullName
            );
          }
        } else {
          if (this.buttonStore.serverSide === "right") {
            this.scoreStore.pointEnded(
              this.matchInfoStore.player1FullName,
              this.matchInfoStore.player2FullName
            );
          } else {
            this.scoreStore.pointEnded(
              this.matchInfoStore.player1FullName,
              this.matchInfoStore.player1FullName
            );
          }
        }
      }

      this.buttonStore.resetShotCharacteristics(this.buttonStore.getPage);

      this.buttonStore.togglePage(1);
    },
  },
};
</script>
