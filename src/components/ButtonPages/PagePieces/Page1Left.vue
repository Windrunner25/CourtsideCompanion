<!-- Server on Left -->
<!-- First Column -->
<template>
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

  <!-- Second Column -->
  <v-col cols="6">
    <v-container class="pa-0">
      <v-row>
        <v-col cols="12">
          <v-btn
            @click="handleReturn(4, 'Return Winner')"
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
            @click="handleReturn(5, 'Return Error')"
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
    // handle serve in, fault, ace
    handleServe(page, input) {
      if(this.scoreStore.fault === false) {
        this.scoreStore.currentPoint["Serve"] = "First Serve";
        this.buttonStore.togglePage(page);
      }
      else {
        this.scoreStore.currentPoint["Serve"] = "Second Serve";
        this.buttonStore.togglePage(page);
      }
    },
    handleReturn(page, input) {
      this.scoreStore.currentPoint["Return"] = input;
      this.buttonStore.togglePage(page);
    },
    handleAce(page) {
      this.scoreStore.currentPoint["Ace"] = true;
      this.buttonStore.togglePage(page);
    },
  },
};
</script>
