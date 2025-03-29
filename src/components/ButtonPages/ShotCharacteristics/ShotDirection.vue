<template>
  <div style="display: flex; justify-content: center">Direction hit...</div>
  <v-container class="pa-1">
    <v-row dense>
      <v-col cols="1.5" />
      <v-col v-for="direction in shotDirection.slice(0,3)" :key="direction.label" cols="3">
        <v-btn
          block
          :class="[
            'text-none',
            'button-hover',
            { selected: buttonStore.isActive(group, direction.label) },
          ]"
          variant="outlined"
          color="primary"
          style="height: 30px; padding: 0px"
          @click="toggleButton(direction.label)"
          >{{ direction.label }}</v-btn
        >
      </v-col>
      <v-col cols="1.5" />
    </v-row>

    <v-row dense>
      <v-col cols="1.5" />
      <v-col v-for="direction in shotDirection.slice(3,5)" :key="direction.label" cols="3">
        <v-btn
          block
          :class="[
            'text-none',
            'button-hover',
            { selected: buttonStore.isActive(group, direction.label) },
          ]"
          variant="outlined"
          color="primary"
          style="height: 30px; padding: 0px"
          @click="toggleButton(direction.label)"
          >{{ direction.label }}</v-btn
        >
      </v-col>
      <v-col cols="1.5" />
    </v-row>
  </v-container>
</template>

<script setup>
import { useButtonStore } from "@/stores/buttonStores";
import { ref } from "vue";

const shotDirection = ref([
  { label: "Cross" },
  { label: "Middle" },
  { label: "Line" },
  { label: "Inside Out" },
  { label: "Inside In" },
]);

const buttonStore = useButtonStore();
const group = 4;

const toggleButton = (label) => {
  buttonStore.setActiveButton(group, label);
};
</script>

<style scoped>
.selected {
  background-color: #fedb8c;
}
</style>
