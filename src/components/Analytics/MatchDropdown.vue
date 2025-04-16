<script setup>
import { ref, onMounted, watch } from "vue";
import { fetchMatches } from "@/firebase/firebaseService";
import { useMatchInfoStore } from "@/stores/matchInfoStore";
import { useMatchScoreStore } from "@/stores/matchScoreStore";

const matchOptions = ref([]);
const selectedMatch = ref(null);
const matchInfoStore = useMatchInfoStore();
const scoreStore = useMatchScoreStore();

onMounted(async () => {
  matchOptions.value = await fetchMatches();
});

watch(selectedMatch, (match) => {
  if (match) {
    console.log(match.player1FirstName, match.player1LastName, match.player2FirstName, match.player2LastName)
    matchInfoStore.setMatchInfo({
        player1FirstName: match.player1FirstName, 
        player1LastName: match.player1LastName, 
        player2FirstName: match.player2FirstName, 
        player2LastName: match.player2LastName
    });
    scoreStore.setMatchID(match.id);
  }
});
</script>

<template>
  <v-select style="margin-bottom: 0;"
    v-model="selectedMatch"
    :items="matchOptions"
    item-title="label"
    :return-object="true" 
    />
</template>
