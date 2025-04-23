<template>
  <div>
    <v-dialog v-model="showPopup" max-width="400">
      <v-card>
        <v-card-title class="headline">Welcome to the third set!</v-card-title>
        <v-card-text> Will this be a full set or a super tiebreak?</v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="thirdSetSuper(false)">Full Third</v-btn>
          <v-btn color="primary" @click="thirdSetSuper(true)">Super Tiebreak</v-btn>
          <v-btn color="primary" @click="showPopup = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useMatchScoreStore } from "@/stores/matchScoreStore.js";

const scoreStore = useMatchScoreStore();
const showPopup = ref(false);

function thirdSetSuper(boolean){
    showPopup.value = false;
    scoreStore.tiebreak = boolean;
    scoreStore.thirdSetSuper = boolean;
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
