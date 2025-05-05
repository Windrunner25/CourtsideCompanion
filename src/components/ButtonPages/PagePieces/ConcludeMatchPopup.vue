<template>
  <div style="width: fit-content; display: inline-block">
    <v-btn
      class="text-none"
      variant="outlined"
      color="primary"
      style="font-size: x-small; height: 20px; padding: 2px"
      @click="showPopup = true"
      >Conclude Match</v-btn
    >
    <v-dialog v-model="showPopup" max-width="400">
      <v-card>
        <v-card-title class="headline"></v-card-title>
        <v-card-text
          >Are you sure you would like to conclude this match?</v-card-text
        >
        <v-card-actions>
          <v-btn color="primary" @click="close(false)">Cancel</v-btn>
          <v-btn color="primary" @click="close(true)">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeStatsToSummaryCollection } from "@/firebase/firebaseService";
import { addFinalScoreToMatch } from "@/firebase/firebaseService";
import { useRouter } from "vue-router";
import { useMatchInfoStore } from "@/stores/matchInfoStore";
import { useMatchScoreStore } from "@/stores/matchScoreStore";

const showPopup = ref(false);
const router = useRouter();
const matchInfoStore = useMatchInfoStore();
const matchScoreStore = useMatchScoreStore();

async function close(confirmed) {
  showPopup.value = false;
  if (confirmed) {
    const currentMatchID = matchScoreStore.currentMatchID;
    const player1 = matchInfoStore.player1FullName;
    const player2 = matchInfoStore.player2FullName;
    await storeStatsToSummaryCollection(currentMatchID, player1, player2);

    const formatSet = (p1, p2, tb1, tb2) => {
      // Only format if one of the players has a non-zero score
      if ((p1 === 0 && p2 === 0) || p1 == null || p2 == null) return null;

      // Tiebreak present for both players
      if (tb1 != null && tb2 != null) {
        return `${p1}-${p2}(${tb1}-${tb2})`;
      }

      return `${p1}-${p2}`;
    };

    const sets = [];

    const set1 = formatSet(
      matchScoreStore.player1Set1,
      matchScoreStore.player2Set1,
      matchScoreStore.player1Set1Tiebreak,
      matchScoreStore.player2Set1Tiebreak
    );
    if (set1) sets.push(set1);

    const set2 = formatSet(
      matchScoreStore.player1Set2,
      matchScoreStore.player2Set2,
      matchScoreStore.player1Set2Tiebreak,
      matchScoreStore.player2Set2Tiebreak
    );
    if (set2) sets.push(set2);

    const set3 = formatSet(
      matchScoreStore.player1Set3,
      matchScoreStore.player2Set3,
      matchScoreStore.player1Set3Tiebreak,
      matchScoreStore.player2Set3Tiebreak
    );
    if (set3) sets.push(set3);

    const matchScore = sets.join(", ");
    const object = {
      id: matchScoreStore.currentMatchID,
      matchScore: matchScore,
    };
    await addFinalScoreToMatch(object);
    router.push("/analytics");
  }
}
</script>
