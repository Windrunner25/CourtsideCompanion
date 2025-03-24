<template>
  <v-row>
    <v-col cols="6">
      Unforced Errors: {{ matchSummary.unforcedErrors }} 
      <br/>
      Forced Errors: {{ matchSummary.forcedErrors }} 
      <br/>
      Winners: {{ matchSummary.winners }} 
      <br/>
      Aces: {{ matchSummary.aces }}
      <br/>
    </v-col>
    <v-col cols="6"> </v-col>
  </v-row>
</template>

<script>
import { useSummaryStore } from "@/stores/matchSummaryStore";

export default {
  setup() {
    const matchSummary = useSummaryStore();
    return { matchSummary };
  },
};
</script>
