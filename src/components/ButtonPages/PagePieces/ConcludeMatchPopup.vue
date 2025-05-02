<template>
  <div style="width: fit-content; display: inline-block">
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
          ></v-card-title
        >
        <v-card-text>Are you sure you would like to conclude this match?</v-card-text>
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
import { useRouter } from "vue-router";

const showPopup = ref(false);
const router = useRouter();

async function close(boolean) {
  showPopup.value = false;
  if (boolean) {
    // await getMatchSummary();
    router.push("/analytics");

  }
}
</script>
