<template>
  <v-row>
    <v-col cols="6">
      <v-container class="pa-0">
        <v-row>
          <v-col cols="12">
            <v-btn
              class="text-none"
              block
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
              @click="buttonStore.togglePage(4)"
              block
              class="text-none"
              variant="tonal"
              color="primary"
              style="height: 63px; margin: 0"
              >Wide</v-btn
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
              style="height: 63px; margin: 0"
              >Body</v-btn
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
              style="height: 63px; margin: 0"
              >T</v-btn
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
