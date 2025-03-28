<template>
  <div style="display: flex; justify-content: center">Rally Length</div>
  <v-container class="pa-1">
    <v-row dense>
      <v-col v-for="length in rallyLengths" :key="length.label" cols="3">
        <v-btn
          block
          :class="[
            'text-none',
            'button-hover',
            { selected: buttonStore.isActive(group, length.label) },
          ]"
          variant="outlined"
          color="primary"
          style="height: 30px; padding: 0px;"
          @click="toggleButton(length.label)"
          >{{ length.label }}</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useButtonStore } from "@/stores/buttonStores";
import { ref } from "vue";

const rallyLengths = ref([
  { label: "1-5"},
  { label: "6-10"},
  { label: "11-15"},
  { label: "16+"},
]);

const buttonStore = useButtonStore();
const group = 6;

const toggleButton = (label) => {
  buttonStore.setActiveButton(group, label);
};

</script>


<style scoped>
.selected {
  background-color: #FEDB8C;
  color: white;
}
</style>
