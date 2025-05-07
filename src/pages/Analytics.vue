<script setup lang="ts">
import ExportButtons from "@/components/Analytics/ExportButtons.vue";
import MatchDropdown from "@/components/Analytics/MatchDropdown.vue";
import MatchSummary from "@/components/Analytics/MatchSummary.vue";
import MomentumGraph from "@/components/Analytics/MomentumGraph.vue";
import SetBySetButton from "@/components/Analytics/SetBySetButton.vue";
import SetBySetSummary from "@/components/Analytics/SetBySetSummary.vue";
import TwoPlayerChart from "@/components/Analytics/Archive/TwoPlayerChart.vue";
import Appbar from "@/components/Appbar.vue";
import LoadingSpinner from "@/components/Interface/LoadingSpinner.vue";
</script>

<template>
  <Appbar />
  <LoadingSpinner/>
  <div class="background">
    <section class="hero text-center">
      <h1 class="display-2 font-weight-bold">Match Analytics Breakdown</h1>
    </section>
    <v-container class="d-flex flex-column justify-center align-center">
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
  background: url("../assets/tenniscourtangle.jpg") center center / cover no-repeat;
  opacity: 0.3;
  z-index: -1;
  pointer-events: none;
}

.hero {
  padding-top: 3rem;
  padding-bottom: 2rem;
}
</style>
