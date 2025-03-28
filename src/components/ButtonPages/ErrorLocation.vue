<template>
  <div style="display: flex; justify-content: center">*If missed...</div>
  <v-container class="pa-1">
    <v-row dense>
      <v-col cols="1.5" />
      <v-col v-for="location in errorLocations" :key="location.label" cols="3">
        <v-btn
          block
          :class="[
            'text-none',
            'button-hover',
            { selected: buttonStore.isActive(group, location.label) },
          ]"
          variant="outlined"
          color="primary"
          style="height: 30px; padding: 0px"
          @click="toggleButton(location.label)"
          >{{ location.label }}</v-btn
        >
      </v-col>
      <v-col cols="1.5" />
    </v-row>
  </v-container>
</template>

<script setup>
import { useButtonStore } from "@/stores/buttonStores";
import { ref } from "vue";

const errorLocations = ref([
  { label: "Long" },
  { label: "Wide" },
  { label: "Net" },
]);
const buttonStore = useButtonStore();
const group = 5;

const toggleButton = (label) => {
  buttonStore.setActiveButton(group, label);
};
</script>

<style scoped>
.selected {
  background-color: #fedb8c;
  color: white;
}
</style>
