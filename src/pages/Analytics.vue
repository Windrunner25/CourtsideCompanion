<script setup lang="ts">
import ExportButtons from "@/components/Analytics/ExportButtons.vue";
import MatchDropdown from "@/components/Analytics/MatchDropdown.vue";
import MatchSummary from "@/components/Analytics/MatchSummary.vue";
import SetBySetButton from "@/components/Analytics/SetBySetButton.vue";
import SetBySetSummary from "@/components/Analytics/SetBySetSummary.vue";
import TwoPlayerChart from "@/components/Analytics/TwoPlayerChart.vue";
import Appbar from "@/components/Appbar.vue";
</script>

<template>
  <Appbar />
  <div class="background">
    <v-container class="text-center py-6">
      <h1 class="analytics-title">🎾 Match Analytics Breakdown</h1>
    </v-container>
    <v-container class="d-flex flex-column justify-center align-center">
      <MatchDropdown title="Select Match" />
      <SetBySetButton />
      <ExportButtons />
    </v-container>
    <SetBySetSummary />
  </div>
</template>

<style>
.background {
  position: relative; /* needed for ::before positioning */
  z-index: 1; /* keeps content above background */
}

.background::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("../assets/statistics.jpg") center center / cover no-repeat;
  opacity: 0.1;
  z-index: -1;
  pointer-events: none;
}
</style>
