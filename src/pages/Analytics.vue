<script setup lang="ts">
import MatchSummary from "@/components/Analytics/MatchSummary.vue";
import TwoPlayerChart from "@/components/Analytics/TwoPlayerChart.vue";
import Appbar from "@/components/Appbar.vue";
</script>

<template>
  <v-container class="text-center py-6">
    <h1 class="analytics-title">🎾 Match Analytics Breakdown</h1>
  </v-container>
  <Appbar />
  <MatchSummary />
</template>
