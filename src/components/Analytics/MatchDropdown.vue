<script setup>
import { ref, onMounted, watch } from "vue";
import { fetchMatches } from "@/firebase/firebaseService";
import { useMatchInfoStore } from "@/stores/matchInfoStore";
import { useMatchScoreStore } from "@/stores/matchScoreStore";

const matchOptions = ref([]);
const selectedMatch = ref(null);
const matchInfoStore = useMatchInfoStore();
const scoreStore = useMatchInfoStore();

onMounted(async () => {
  matchOptions.value = await fetchMatches();
});

watch(selectedMatch, (match) => {
  if (match) {
    matchInfoStore.setMatchInfo({
      player1FullName: `${match.player1FirstName} ${match.player1LastName}`,
      player2FullName: `${match.player2FirstName} ${match.player2LastName}`,
    });
    scoreStore.setMatchID(match.id);
  }
});
</script>

<template>
  <v-select
    v-model="selectedMatch"
    :items="matchOptions"
    item-title="label"
    item-value="id"
    label="Select a Match"
  />
</template>
