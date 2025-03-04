<template>
  <v-container class="pa-0">
    <v-row>
      <v-col cols="6" class="pr-1 pt-1">
        <v-btn
          @click="toggleButton(group1, id1, side)"
          :class="[
            'text-none',
            { selected: buttonStore.isActive(group1, id1, side) },
          ]"
          :style="{ color: color1 }"
          :ripple="false"
          block
          variant="outlined"
          style="height: 40px; margin: 0"
          >{{ button1 }}</v-btn
        >
      </v-col>
      <v-col cols="6" class="pl-1 pt-1">
        <v-btn
          @click="toggleButton(group2, id2, side)"
          :class="[
            'text-none',
            { selected: buttonStore.isActive(group2, id2, side) },
          ]"
          :style="{ color: color2 }"
          :ripple="false"
          block
          variant="outlined"
          style="height: 40px; margin: 0"
          >{{ button2 }}</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useButtonStore } from "@/stores/buttonStores";

export default {
  props: {
    button1: String,
    button2: String,
    id1: String,
    id2: String,
    color1: String,
    color2: String,
    group1: Number,
    group2: Number,
    side: String,
  },
  data() {
    return {
      buttonStore: useButtonStore(), // Initialize the store inside data()
    };
  },
  methods: {
    toggleButton(group, id, side) {
      this.buttonStore.setActiveButton(group, id, side);
    },
  },
};
</script>

<style>
.selected {
  background-color: #fdb71a;
  color: white;
}
</style>
