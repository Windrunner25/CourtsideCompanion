<template>
  <v-row>
    <!-- First Column -->
    <v-col cols="6">
      <v-container class="pa-0">
        <v-row>
          <v-col cols="12">
            <v-btn
              @click="buttonStore.togglePage(5)"
              block
              class="text-none"
              variant="tonal"
              color="primary"
              style="height: 100px; margin: 0"
              >Winner</v-btn
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
              style="height: 100px; margin: 0"
              >Unforced Error</v-btn
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
              style="height: 100px; margin: 0"
              >Forced Error</v-btn
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
              @click="buttonStore.togglePage(6)"
              block
              class="text-none"
              variant="tonal"
              color="primary"
              style="height: 100px; margin: 0"
              >Winner</v-btn
            >
          </v-col>
        </v-row>
      </v-container>

      <v-container class="pa-0">
        <v-row>
          <v-col cols="12">
            <v-btn
              @click="buttonStore.togglePage(6)"
              block
              class="text-none"
              variant="tonal"
              color="primary"
              style="height: 100px; margin: 0"
              >Unforced Error</v-btn
            >
          </v-col>
        </v-row>
      </v-container>

      <v-container class="pa-0">
        <v-row>
          <v-col cols="12">
            <v-btn
              @click="buttonStore.togglePage(6)"
              block
              class="text-none"
              variant="tonal"
              color="primary"
              style="height: 100px; margin: 0"
              >Forced Error</v-btn
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
    return {};
  },
};
</script>

<style>
.selected {
  background-color: #fdb71a;
  color: white;
}
</style>
