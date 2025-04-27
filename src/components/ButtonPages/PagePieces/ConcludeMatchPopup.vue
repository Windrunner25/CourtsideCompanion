<template>
  <div style="width: fit-content;">
    <v-btn
      class="text-none"
      variant="outlined"
      color="primary"
      style="font-size: x-small; height: 20px; padding: 2px;"
      @click="showPopup = true"
      >Conclude Match</v-btn
    >
    <v-dialog v-model="showPopup" max-width="400">
      <v-card>
        <v-card-title class="headline"
          >Are you sure you would like to conclude this match?</v-card-title
        >
        <v-card-text></v-card-text>
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
import { getMatchSummary } from "@/firebase/firebaseService";

const showPopup = ref(false);

async function close(boolean) {
  showPopup.value = false;
  if (boolean) {
    await getMatchSummary();
  }
}
</script>
