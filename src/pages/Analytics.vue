<script setup lang="ts">
import DummyChart from "@/components/Analytics/AnalyticsPageData.vue";
import MatchSummary from "@/components/Analytics/MatchSummary.vue";
import TwoPlayerChart from "@/components/Analytics/TwoPlayerChart.vue";
import Appbar from "@/components/Appbar.vue";
</script>

<template>
  <Appbar />
  <MatchSummary />
  <TwoPlayerChart />
</template>
