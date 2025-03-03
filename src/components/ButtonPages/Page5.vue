<template>
  <v-row>
    <v-col cols="6" />
    <v-col cols="6">
      <div>The serve was...</div>
      <v-container class="pa-0">
        <v-row>
          <v-col cols="12">
            <v-btn
              @click="buttonStore.togglePage(1)"
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
              @click="buttonStore.togglePage(1)"
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
              @click="buttonStore.togglePage(1)"
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

      <v-container class="pa-0">
        <v-row>
          <v-col cols="12">
            <v-btn
              class="text-none"
              block
              variant="tonal"
              color="primary"
              style="height: 100px; margin: 0; background-color: #ffc1c1"
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
    return {};
  },
};
</script>

<style>

</style>
