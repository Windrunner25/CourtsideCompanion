<script setup lang="ts">
import LiveStatsButton from "@/components/Analytics/LiveStatsButton.vue";
import MatchDropdown from "@/components/Analytics/MatchDropdown.vue";
import MatchSummary from "@/components/Analytics/MatchSummary.vue";
import SetBySetButton from "@/components/Analytics/SetBySetButton.vue";
import SetBySetSummary from "@/components/Analytics/SetBySetSummary.vue";
import TwoPlayerChart from "@/components/Analytics/TwoPlayerChart.vue";
import Appbar from "@/components/Appbar.vue";
</script>

<template>
  <Appbar />
  <v-container class="text-center py-6">
    <h1 class="analytics-title">🎾 Match Analytics Breakdown</h1>
  </v-container>
  <v-container class="d-flex justify-center align-center">
    <MatchDropdown title="Select Match" />
    <LiveStatsButton />
    <SetBySetButton/>
  </v-container>
  <!-- <MatchSummary /> -->
   <SetBySetSummary/>
</template>
