<template>
  <div style="display: flex; justify-content: center">Type of shot...</div>
  <v-container class="pa-1">
    <v-row dense>
      <v-col v-for="type in shotTypes" :key="type.label" cols="3">
        <v-btn
          block
          :class="[
            'text-none',
            'button-hover',
            { selected: buttonStore.isActive(group, type.label) },
          ]"
          variant="outlined"
          color="primary"
          style="height: 30px; padding: 0px"
          @click="toggleButton(type.label)"
          >{{ type.label }}</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useButtonStore } from "@/stores/buttonStores";
import { ref } from "vue";

const shotTypes = ref([
  { label: "Ground" },
  { label: "Approach" },
  { label: "Pass" },
  { label: "Slice" },
  { label: "Volley" },
  { label: "Dropshot" },
  { label: "Smash" },
  { label: "Lob" },
]);
const buttonStore = useButtonStore();
const group = 3;

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
