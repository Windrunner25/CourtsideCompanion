<template>
  <v-btn @click="buttonStore.togglePage(1)">Set to 1</v-btn>
  <v-btn @click="buttonStore.togglePage(2)">Set to 2</v-btn>
  <v-btn @click="buttonStore.togglePage(3)">Set to 3</v-btn>
  <v-btn @click="buttonStore.togglePage(4)">Set to 4</v-btn>

  <v-container class="grid">
    <div v-if="buttonStore.page === 1">
      <PageOne />
    </div>
    <div v-if="buttonStore.page === 2">
      <ServeIn />
    </div>
    <div v-if="buttonStore.page === 3">
      <PageThree />
    </div>
  </v-container>
</template>

<script>
import { useButtonStore } from "@/stores/buttonStores";
import PageOne from "@/components/ButtonPages/PageOne.vue";
import ServeIn from "./ButtonPages/ServeIn.vue";
import PageThree from "./ButtonPages/PageThree.vue";

export default {
  setup() {
    const buttonStore = useButtonStore();
    return { buttonStore };
  },
  data() {
    return {
    };
  },
  methods: {},
};
</script>

<style>
.grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 600px;
  width: 425px;
  justify-content: center;
  border: 2px solid red; /* Change color as needed */
}
</style>
