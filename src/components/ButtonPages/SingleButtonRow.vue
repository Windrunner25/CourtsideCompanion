<template>
  <v-container class="pa-0">
    <v-row>
      <v-col cols="6" class="pr-1 pt-1">
        <v-btn
          @click="toggleButton"
          :class="[
            'text-none',
            { selected: buttonStore.isActive(group1, id1, side) },
          ]"
          :style="{ color: color1 }"
          :ripple="false"
          block
          variant="outlined"
          style="height: 30px; margin: 0"
          >{{ button1 }}</v-btn
        >
      </v-col>
      <v-col cols="6">
        <div>*If missed</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useButtonStore } from "@/stores/buttonStores";

export default {
  props: {
    button1: String,
    id1: String,
    color1: String,
    group1: Number,
    side: String,
  },
  data() {
    return {
      buttonStore: useButtonStore(), // Initialize the store inside data()
    };
  },
  methods: {
    toggleButton() {
      this.buttonStore.setActiveButton(this.group1, this.id1, this.side);
    },
  },
};
</script>

<style>
.selected {
  color: white;
}
</style>
