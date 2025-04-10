<template>
  <!--<v-btn @click="buttonStore.togglePage(1)">Set to 1</v-btn>
  <v-btn @click="buttonStore.togglePage(8)">Set to 9</v-btn>
 <v-btn @click="buttonStore.togglePage(10)">Set to 10</v-btn> -->
  <!-- <v-btn @click="buttonStore.togglePage(3)">Set to 3</v-btn>
  <v-btn @click="buttonStore.togglePage(4)">Set to 4</v-btn>
  <v-btn @click="buttonStore.togglePage(5)">Set to 5</v-btn>
  <v-btn @click="buttonStore.togglePage(6)">Set to 6</v-btn>
  <v-btn @click="buttonStore.togglePage(7)">Set to 7</v-btn>
  <v-btn @click="buttonStore.togglePage(8)">Set to 8</v-btn> 
  <div>Currently on page: {{ buttonStore.getPage }}</div>-->

  <div v-if="buttonStore.page === 0">
    <NewMatchView />
  </div>

  <div style="margin-top: 25px"></div>
  <div v-if="buttonStore.page != 0">
    <!-- <v-btn @click="getMatch">Run Query</v-btn> -->

    <v-container class="grid">
      <ScoreCard />
      <v-container style="height: 15px; margin-bottom: 10px">
        <v-row>
          <v-col
            cols="6"
            style="display: flex; align-items: center; justify-content: center"
          >
            {{ matchInfoStore.player1FirstName }}
          </v-col>
          <v-col
            cols="6"
            style="display: flex; align-items: center; justify-content: center"
          >
            {{ matchInfoStore.player2FirstName }}
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
        <MatchSummary />
      </div>

      <SubmitButton />
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
  </div>
</template>

<script>
import { useButtonStore } from "@/stores/buttonStores";
import { useMatchScoreStore } from "@/stores/matchScoreStore";
import { useMatchInfoStore } from "@/stores/matchInfoStore";
import { useSummaryStore } from "@/stores/matchSummaryStore";

import Page1 from "./ButtonPages/Page1.vue";
import Page2 from "./ButtonPages/Page2.vue";
import Page3 from "./ButtonPages/Page3.vue";
import Page4 from "./ButtonPages/Page4.vue";
import Page5 from "./ButtonPages/Page5.vue";
import Page6 from "./ButtonPages/Page6.vue";
import Page7 from "./ButtonPages/Page7.vue";
import SubmitButton from "./Interface/SubmitButton.vue";
import NewMatchForm from "./Interface/NewMatchForm.vue";
import NewMatchView from "./Interface/NewMatchView.vue";
import ScoreCard from "./Interface/ScoreCard.vue";
import MatchSummary from "./Interface/MatchSummary.vue";

export default {
  components: {
    Page1,
    Page2,
    Page3,
    Page4,
    Page5,
    Page6,
    Page7,
    SubmitButton,
    NewMatchForm,
  },
  setup() {
    const buttonStore = useButtonStore();
    const scoreStore = useMatchScoreStore();
    const matchInfoStore = useMatchInfoStore();
    const summaryStore = useSummaryStore();
    const showNewMatchForm = ref(false);
    return {
      buttonStore,
      scoreStore,
      matchInfoStore,
      showNewMatchForm,
      summaryStore,
    };
  },
  methods: {},
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
  background-color: white;
}
</style>
