<template>
  <v-container fluid class="d-flex justify-center align-center">
    <MatchAnalyticsP1 class="ma-4" />
    <div class="d-flex justify-center align-center flex-column" style="font-size: 14px;">
      <div>Row 1</div>
      <div>Row 1</div>
    </div>
    <MatchAnalyticsP2 class="ma-4" />
  </v-container>
</template>

<script setup>
import MatchAnalyticsP1 from "./MatchAnalyticsP1.vue";
import MatchAnalyticsP2 from ".//MatchAnalyticsP2.vue";
</script>
