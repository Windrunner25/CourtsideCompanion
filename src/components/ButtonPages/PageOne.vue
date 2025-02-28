<template>
  <v-row>
    <!-- First Column -->
    <v-col cols="6">
      <v-container class="pa-0">
        <v-row>
          <v-col cols="12">
            <!-- ACTIVE BUTTON -->
            <v-btn
              block
              :class="{ selected: buttonStore.ServeActive }"
              @click="buttonStore.ServeActive = !buttonStore.ServeActive, buttonStore.togglePage(2)"
              class="text-none"
              variant="tonal"
              color="primary"
              style="height: 100px; margin: 0; background-color: #c0e4c0;"
              >Serve In</v-btn
            >
          </v-col>
        </v-row>
      </v-container>

      <v-container class="pa-0">
        <v-row>
          <v-col cols="12">
            <v-btn
              @click="buttonStore.togglePage(4)" 
              block
              class="text-none"
              variant="tonal"
              color="primary"
              style="height: 100px; margin: 0; background-color: #FFC1C1"
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
              :class="{ selected: buttonStore.AceActive }"
              @click="buttonStore.AceActive = !buttonStore.AceActive, buttonStore.togglePage(3)"
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

    <!-- Second Column -->
    <v-col cols="6">
      <v-container class="pa-0">
        <v-row>
          <v-col cols="12">
            <v-btn
              @click="buttonStore.togglePage(2)"
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
              @click="buttonStore.togglePage(2)"
              block
              class="text-none"
              variant="tonal"
              color="primary"
              style="height: 156px; margin: 0; background-color: #FFC1C1;"
              >Return Error</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { useButtonStore } from "@/stores/buttonStores";

export default {
  setup() {
    const buttonStore = useButtonStore();
    return { buttonStore };
  },
  data() {
    return {
    };
  },
};
</script>

<style>
.selected {
  background-color: #fdb71a;
  color: white;
}
</style>
