<!-- Server on right -->
<!-- First Column -->
<template>
  <v-col cols="6">
    <v-container class="pa-0">
      <v-row>
        <v-col cols="12">
          <v-btn
            @click="buttonStore.togglePage(4)"
            block
            class="text-none"
            variant="tonal"
            color="primary"
            style="height: 156px; margin: 0; background-color: #c0e4c0"
            >Return Winner</v-btn
          >
        </v-col>
      </v-row>
    </v-container>

    <v-container class="pa-0">
      <v-row>
        <v-col cols="12">
          <v-btn
            @click="buttonStore.togglePage(5)"
            block
            class="text-none"
            variant="tonal"
            color="primary"
            style="height: 156px; margin: 0; background-color: #ffc1c1"
            >Return Error</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-col>
  <v-col cols="6">
    <v-container class="pa-0">
      <v-row>
        <v-col cols="12">
          <v-btn
            block
            @click="buttonStore.togglePage(2)"
            class="text-none"
            variant="tonal"
            color="primary"
            style="height: 100px; margin: 0; background-color: #c0e4c0"
            >Serve In</v-btn
          >
        </v-col>
      </v-row>
    </v-container>

    <v-container class="pa-0">
      <v-row>
        <v-col cols="12">
          <v-btn
            @click="scoreStore.fault(1)"
            block
            class="text-none"
            variant="tonal"
            color="primary"
            style="height: 100px; margin: 0; background-color: #ffc1c1"
            >Fault</v-btn
          >
        </v-col>
      </v-row>
    </v-container>

    <v-container class="pa-0">
      <v-row>
        <v-col cols="12">
          <v-btn
            block
            @click="buttonStore.togglePage(3)"
            class="text-none"
            variant="tonal"
            color="primary"
            style="height: 100px; margin: 0; background-color: #c0e4c0"
            >Ace</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<script setup>
import { useButtonStore } from "@/stores/buttonStores"; // Import your Pinia store
import { useMatchScoreStore } from "@/stores/matchScoreStore";

const buttonStore = useButtonStore(); // Use the store
const scoreStore = useMatchScoreStore();
</script>
