<template>
  <v-row>
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
              >Return Winner</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
      <div>The serve was...</div>
      <v-container class="pa-0">
        <v-row>
          <v-col cols="12">
            <v-btn
              @click="handleClick"
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
              @click="handleClick"
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
              @click="handleClick"
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
import { useMatchScoreStore } from "@/stores/matchScoreStore";

export default {
  setup() {
    const buttonStore = useButtonStore();
    const scoreStore = useMatchScoreStore();
    return { buttonStore, scoreStore };
  },
  data() {
    return {};
  },
  methods: {
    handleClick(){
      this.scoreStore.incrementScore(2);
      this.buttonStore.togglePage(1);
    }
  }
};
</script>

<style>

</style>
