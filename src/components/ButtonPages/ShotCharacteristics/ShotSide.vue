<template>
  <div style="display: flex; justify-content: center">Shot intent was...</div>
  <v-container class="pa-1">
    <v-row dense>
      <v-col cols="1.5" />
      <v-col v-for="side in shotSide" :key="side.label" cols="3">
        <v-btn
          block
          :class="[
            'text-none',
            'button-hover',
            { selected: buttonStore.isActive(group, side.label) },
          ]"
          variant="outlined"
          color="primary"
          style="height: 30px; padding: 0px"
          @click="toggleButton(side.label)"
          >{{ side.label }}</v-btn
        >
      </v-col>
      <v-col cols="1.5" />
    </v-row>
  </v-container>
</template>

<script setup>
import { useButtonStore } from "@/stores/buttonStores";
import { ref } from "vue";

const shotSide = ref([{ label: "Forehand" }, { label: "Backhand" }]);

const buttonStore = useButtonStore();
const group = 2;

const toggleButton = (label) => {
  buttonStore.setActiveButton(group, label);
};
</script>

<style scoped>
.selected {
  background-color: #fedb8c;
}
</style>
