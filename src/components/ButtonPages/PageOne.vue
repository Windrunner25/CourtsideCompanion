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
              :class="{ selected: ServeInActive }"
              @click="ServeInActive = !ServeInActive"
              class="text-none"
              variant="tonal"
              color="primary"
              style="height: 100px; margin: 0"
              >Serve In</v-btn
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
              style="height: 100px; margin: 0"
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
              :class="{ selected: AceActive }"
              @click="AceActive = !AceActive"
              class="text-none"
              variant="tonal"
              color="primary"
              style="height: 100px; margin: 0"
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
              style="height: 200px; margin: 0"
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
              style="height: 200px; margin: 0"
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
      ServeInActive: false,
      AceActive: false,
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
