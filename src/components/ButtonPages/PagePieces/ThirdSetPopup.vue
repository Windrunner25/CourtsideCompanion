<template>
  <div>
    <v-dialog v-model="showPopup" max-width="400">
      <v-card>
        <v-card-title class="headline">Welcome to the third set!</v-card-title>
        <v-card-text> Will this be a full set or a super tiebreak?</v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="thirdSetSuper(false)"
            >Full Third</v-btn
          >
          <v-btn color="primary" @click="thirdSetSuper(true)"
            >Super Tiebreak</v-btn
          >
          <v-btn color="primary" @click="matchOver">Match Over</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useMatchScoreStore } from "@/stores/matchScoreStore.js";
import { useRouter } from "vue-router";
import { addFinalScoreToMatch } from "@/firebase/firebaseService.js";

const router = useRouter();
const scoreStore = useMatchScoreStore();
const showPopup = ref(false);

function thirdSetSuper(boolean) {
  showPopup.value = false;
  scoreStore.tiebreak = boolean;
  scoreStore.thirdSetSuper = boolean;
}
async function matchOver() {
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
    scoreStore.player1Set1,
    scoreStore.player2Set1,
    scoreStore.player1Set1Tiebreak,
    scoreStore.player2Set1Tiebreak
  );
  if (set1) sets.push(set1);

  const set2 = formatSet(
    scoreStore.player1Set2,
    scoreStore.player2Set2,
    scoreStore.player1Set2Tiebreak,
    scoreStore.player2Set2Tiebreak
  );
  if (set2) sets.push(set2);

  const set3 = formatSet(
    scoreStore.player1Set3,
    scoreStore.player2Set3,
    scoreStore.player1Set3Tiebreak,
    scoreStore.player2Set3Tiebreak
  );
  if (set3) sets.push(set3);

  const matchScore = sets.join(", ");
  const object = {
    id: scoreStore.currentMatchID,
    matchScore: matchScore,
  };
  await addFinalScoreToMatch(object);
  showPopup.value = false;
  router.push("/analytics");
}

watch(
  () => scoreStore.currentSet,
  (newSet) => {
    if (newSet === 3) {
      showPopup.value = true;
    }
  }
);
</script>
