<template>
  <div>
    <!-- Initial Group of Buttons -->
    <div v-if="!buttonStore.selectedButton">
      <v-btn @click="buttonStore.setSelected('serveIn')" block>Serve In</v-btn>
      <v-btn @click="buttonStore.setSelected('ace')" block>Ace</v-btn>
      <v-btn @click="buttonStore.setSelected('returnWinner')" block
        >Return Winner</v-btn
      >
    </div>

    <!-- Serve In Selected - Show New Buttons -->
    <div v-if="buttonStore.selectedButton === 'serveIn'">
      <v-btn block class="selected">Serve In</v-btn>
      <!-- Stays Active -->
      <v-btn @click="buttonStore.setSelected('option1')" block>Option 1</v-btn>
      <v-btn @click="buttonStore.setSelected('option2')" block>Option 2</v-btn>
    </div>

    <!-- Ace Selected - Show Different Buttons -->
    <div v-if="buttonStore.selectedButton === 'ace'">
      <v-btn block class="selected">Ace</v-btn>
      <!-- Stays Active -->
      <v-btn @click="buttonStore.setSelected('winner')" block>Winner</v-btn>
      <v-btn @click="buttonStore.setSelected('error')" block>Error</v-btn>
    </div>

    <!-- Reset Selection -->
    <v-btn @click="buttonStore.resetSelection()" block>Back</v-btn>
  </div>
</template>

<script>
import { useButtonStore } from "@/stores/buttonStores";

export default {
  setup() {
    const buttonStore = useButtonStore();
    return { buttonStore };
  },
};
</script>

<style>
.selected {
  background-color: #fdb71a;
  color: white;
}
</style>
