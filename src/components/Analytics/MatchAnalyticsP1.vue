<script setup>
import { onMounted, ref } from "vue";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  ChartDataLabels
);

const chartRef = ref(null);
let chartInstance;

const labels = [
  "Unforced Errors",
  "Forced Errors",
  "Winners",
  "Aces",
  "Double Faults",
  "Deuce Points Won",
];

const data = {
  labels,
  datasets: [
    {
      label: "Player 1",
      data: [null, -2, -13, -5, -6, -5], // ← keep positive
      backgroundColor: "rgba(255, 99, 132, 0.7)",
      xAxisID: "x0", // default axis
      skipNull: true,
    },
    {
      label: "Player 1 (Scaled)",
      data: [-5, null, null, null, null, null], // single bar
      backgroundColor: "rgba(153, 102, 255, 0.7)",
      xAxisID: "x1", // separate axis
      skipNull: true,
    },
  ],
};

const options = {
  indexAxis: "y",
  responsive: true,
  scales: {
    x0: {
      type: "linear",
      position: "bottom",
      min: 0,
      max: -15,
      grid: { display: false },
    },
    x1: {
      type: "linear",
      position: "top",
      min: 0,
      max: -10,
      grid: { display: false },
      display: false, // if you don’t want to show the axis
    },
    y: {
      stacked: true,
      grid: { display: false },
      ticks: {
        display: false, // 👈 hides "Unforced Errors", etc.
      },
    },
  },
  plugins: {
    datalabels: {
      display: function (context) {
        const value = context.dataset.data[context.dataIndex];
        return value !== null && value !== 0;
      },
      color: "#fff",
      anchor: "center",
      align: "center",
      font: {
        weight: "bold",
        size: 14,
      },
      formatter: Math.abs, // optional: removes minus sign
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.dataset.label}: ${Math.abs(context.raw)}`;
        },
      },
    },
    title: {
      display: false,
      text: "Match Comparison (Player 1 vs Player 2)",
      font: {
        size: 18,
      },
    },
    legend: {
      position: "bottom",
      display: false,
    },
  },
};

onMounted(() => {
  const ctx = chartRef.value.getContext("2d");
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: "bar",
    data,
    options,
  });
});
</script>

<template>
  <div>
    <canvas ref="chartRef" style="max-height: 450px"></canvas>
  </div>
</template>
