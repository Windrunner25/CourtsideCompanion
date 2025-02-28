<template>
  <v-btn @click="buttonStore.togglePage(1)">Set to 1</v-btn>
  <v-btn @click="buttonStore.togglePage(2)">Set to 2</v-btn>
  <v-btn @click="buttonStore.togglePage(3)">Set to 3</v-btn>
  <v-btn @click="buttonStore.togglePage(4)">Set to 4</v-btn>
  <v-btn @click="buttonStore.togglePage(5)">Set to 5</v-btn>
  <v-btn @click="buttonStore.togglePage(6)">Set to 6</v-btn>

  <v-container class="grid">
    <div v-if="buttonStore.page === 1">
      <PageOne />
    </div>
    <div v-if="buttonStore.page === 2">
      <PageTwo />
    </div>
    <div v-if="buttonStore.page === 3">
      <PageThree />
    </div>
    <div v-if="buttonStore.page === 4">
      <PageFour />
    </div>
    <div v-if="buttonStore.page === 5">
      <PageFive />
    </div>
    <div v-if="buttonStore.page === 6">bye</div>
    <div>
      <v-btn
        block
        class="text-none"
        variant="tonal"
        color="primary"
        @click="
          buttonStore.getPage > 0 &&
            buttonStore.togglePage(buttonStore.getPage - 1)
        "
        :disabled="buttonStore.getPage === 1"
      >
        Undo
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { useButtonStore } from "@/stores/buttonStores";
import PageOne from "@/components/ButtonPages/PageOne.vue";
import PageThree from "./ButtonPages/PageThree.vue";
import PageTwo from "./ButtonPages/PageTwo.vue";
import Testbuttons from "./ButtonPages/testbuttons.vue";
import PageFour from "./ButtonPages/PageFour.vue";
import PageFive from "./ButtonPages/PageFive.vue";

export default {
  setup() {
    const buttonStore = useButtonStore();
    return { buttonStore };
  },
  data() {
    return {};
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
