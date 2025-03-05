<script setup lang="ts">
import { mdiAlignHorizontalCenter } from "@mdi/js";
import Chart from "chart.js/auto";
import { onMounted } from "vue";
import { blue, green, red } from "vuetify/util/colors";

const labels = ["Jan", "Feb", "March", "April", "May", "June", "July"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Unforced Errors",
      backgroundColor: "blue",
      borderColor: "blue",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
    {
      label: "Forced Errors",
      backgroundColor: "red", 
      borderColor: "red", 
      data: [10, 25, 15, 20, 10, 25, 35],
    },
    {
      label: "Double Faults",
      backgroundColor: "green",
      borderColor: "green",
      data: [20, 15, 45, 20, 20, 10, 15],
    },
  ],
};

const config = {
  type: "line" as const,
  data: data,
  options: {
    maintainAspectRatio: false,
  },
};

onMounted(() => {
  const canvasTag = document.getElementById("myChart") as HTMLCanvasElement;
  if (!canvasTag) {
    console.error("Canvas element not found!");
    return;
  }
  new Chart(canvasTag, config);
});
</script>

<template>
  <v-container>
    <div>
      <canvas id="myChart" height="400px"></canvas>
    </div>
  </v-container>
</template>
