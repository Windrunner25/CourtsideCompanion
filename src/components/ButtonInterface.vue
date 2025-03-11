<template>
  <!-- <v-btn @click="buttonStore.togglePage(1)">Set to 1</v-btn>
  <v-btn @click="buttonStore.togglePage(2)">Set to 2</v-btn>
  <v-btn @click="buttonStore.togglePage(3)">Set to 3</v-btn>
  <v-btn @click="buttonStore.togglePage(4)">Set to 4</v-btn>
  <v-btn @click="buttonStore.togglePage(5)">Set to 5</v-btn>
  <v-btn @click="buttonStore.togglePage(6)">Set to 6</v-btn>
  <v-btn @click="buttonStore.togglePage(7)">Set to 7</v-btn>
  <v-btn @click="buttonStore.togglePage(8)">Set to 8</v-btn>
  <div>Currently on page: {{ buttonStore.getPage }}</div> -->

  <v-btn @click="scoreStore.resetScore">Clear Score</v-btn>
  <v-btn @click="buttonStore.switchServer">Switch Server</v-btn>

  <div style="margin-top: 25px"></div>
  <v-container class="grid">
    <Score />
    <v-container style="height: 15px; margin-bottom: 10px">
      <v-row>
        <v-col
          cols="6"
          style="display: flex; align-items: center; justify-content: center"
        >
          Player 1
        </v-col>
        <v-col
          cols="6"
          style="display: flex; align-items: center; justify-content: center"
        >
          Player 2
        </v-col>
      </v-row>
    </v-container>
    <div v-show="buttonStore.page === 1">
      <Page1 />
    </div>
    <div v-show="buttonStore.page === 2">
      <Page2 />
    </div>
    <div v-show="buttonStore.page === 3">
      <Page3 />
    </div>
    <div v-show="buttonStore.page === 4">
      <Page4 />
    </div>
    <div v-show="buttonStore.page === 5">
      <Page5 />
    </div>
    <div v-show="buttonStore.page === 6">
      <Page6 />
    </div>
    <div v-show="buttonStore.page === 7">
      <Page7 />
    </div>
    <div v-show="buttonStore.page === 8">
      <Page8 />
    </div>
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
    <div>
      <v-btn
        block
        class="text-none"
        variant="tonal"
        color="primary"
        @click="buttonStore.getPage > 0 && buttonStore.undo()"
      >
        Undo
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { useButtonStore } from "@/stores/buttonStores";
import { useMatchScoreStore } from "@/stores/matchScoreStore";
import Page1 from "./ButtonPages/Page1.vue";
import Page2 from "./ButtonPages/Page2.vue";
import Page3 from "./ButtonPages/Page3.vue";
import Page4 from "./ButtonPages/Page4.vue";
import Page5 from "./ButtonPages/Page5.vue";
import Page6 from "./ButtonPages/Page6.vue";
import Page7 from "./ButtonPages/Page7.vue";
import Page8 from "./ButtonPages/Page8.vue";

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
      this.scoreStore.currentPoint["Stroke Intent"] = this.buttonStore.group1LeftActive;
      this.scoreStore.currentPoint["Stroke Type"] = this.buttonStore.group2LeftActive;
      this.scoreStore.currentPoint["Stroke Location"] = this.buttonStore.group3LeftActive;
      this.scoreStore.currentPoint["Error Location"] = this.buttonStore.group4LeftActive;
      this.buttonStore.reset(this.buttonStore.getPage);``
      this.buttonStore.togglePage(1);
    },
  },
};
</script>

<style>
.grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 425px;
  justify-content: center;
  border: 2px solid black; /* Change color as needed */
}
</style>
