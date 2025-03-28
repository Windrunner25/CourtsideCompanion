<template>
  <v-col cols="6" />
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
            @click="handleServe(6, 'Wide')"
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
        <v-col cols="6" style="padding-right: 5px">
          <v-btn
            @click="handleServe(6, 'Body Forehand')"
            block
            class="text-none text-wrap"
            variant="tonal"
            color="primary"
            style="height: 63px; margin: 0; padding: 0px"
            >Body Forehand</v-btn
          >
        </v-col>
        <v-col cols="6" style="padding-left: 5px">
          <v-btn
            @click="handleServe(6, 'Body Backhand')"
            block
            class="text-none text-wrap"
            variant="tonal"
            color="primary"
            style="height: 63px; margin: 0; padding: 0px"
            >Body Backhand</v-btn
          >
        </v-col>
      </v-row>
    </v-container>

    <v-container class="pa-0">
      <v-row>
        <v-col cols="12">
          <v-btn
            @click="handleServe(6, 'T')"
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
</template>

<script>
import { useButtonStore } from "@/stores/buttonStores"; // Import your Pinia store
import { useMatchScoreStore } from "@/stores/matchScoreStore";

export default {
  setup() {
    const buttonStore = useButtonStore();
    const scoreStore = useMatchScoreStore();
    return { buttonStore, scoreStore };
  },
  methods: {
    handleServe(page, serveLocation) {
      this.scoreStore.currentPoint["Serve Location"] = serveLocation;
      this.buttonStore.togglePage(page);
    },
  },
};
</script>

<style scoped>
.text-wrap {
  word-break: break-word;
  white-space: normal !important;
}
:deep(.v-btn__content) {
  white-space: pre-wrap;
}
</style>
