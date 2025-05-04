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
import { useRouter } from "vue-router";
import { useMatchInfoStore } from "@/stores/matchInfoStore";
import { useMatchScoreStore } from "@/stores/matchScoreStore";

const showPopup = ref(false);
const router = useRouter();
const matchInfoStore = useMatchInfoStore();
const matchScoreStore = useMatchScoreStore();

async function close(boolean) {
  showPopup.value = false;
  if (boolean) {
    const currentMatchID = matchScoreStore.currentMatchID;
    const player1 = matchInfoStore.player1FullName;
    const player2 = matchInfoStore.player2FullName;
    await storeStatsToSummaryCollection(currentMatchID, player1, player2);
    router.push("/analytics");
  }
}
</script>
