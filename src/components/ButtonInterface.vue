<template>

  <div v-if="buttonStore.page === 0">
    <NewMatchView />
  </div>

  <div style="margin-top: 25px"></div>
  <div v-if="buttonStore.page != 0">
    <v-container class="grid">
      <ThirdSetPopup />
      <ScoreCard />

      <v-container
        v-show="buttonStore.page != 8"
        style="height: 15px; margin-bottom: 10px"
      >
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
        <v-container class="d-flex align-center justify-center">
          <LiveStatsButton />
          <v-btn
            class="text-none"
            variant="tonal"
            color="primary"
            style="margin-left: 5px"
            @click="buttonStore.getPage > 0 && buttonStore.undo()"
            >Back to Match</v-btn
          >
        </v-container>
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
import { useSummaryStore } from "@/stores/analyticsStore";

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
import MatchSummary from "./Analytics/MatchSummary.vue";
import ThirdSetPopup from "./ButtonPages/PagePieces/ThirdSetPopup.vue";
import LiveStatsButton from "./Analytics/LiveStatsButton.vue";

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
  animation: fadeInUp 0.8s ease;
}

@keyframes fadeInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
