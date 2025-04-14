<template>
  <div>
    <canvas ref="chartRef" style="max-height: 450px"></canvas>
  </div>
</template>

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

import { getMatchSummary } from "@/firebase/firebaseService";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useSummaryStore } from "@/stores/matchSummaryStore";

import { ref, onMounted } from "vue";
import { Chart, BarController, BarElement, CategoryScale, LinearScale } from "chart.js";

const analyticsStore = useSummaryStore();

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

// function updateChart(newData) {
//   if (chartInstance) {
//     chartInstance.data.datasets[0].data = newData;
//     chartInstance.update();
//   }
// }

// defineExpose({ updateChart });


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
      data: [-analyticsStore.unforcedErrorsPlayer1, null, null, null, null, null],
      backgroundColor: "rgb(135,206,250)",
      xAxisID: "x0", // default axis
      skipNull: true,
    },
    {
      label: "Player 1",
      data: [null, -analyticsStore.forcedErrorsPlayer1, null, null, null, null], // single bar
      backgroundColor: "rgb(135,206,250)",
      xAxisID: "x1", // separate axis
      skipNull: true,
    },
    {
      label: "Player 1",
      data: [null, null, -analyticsStore.winnersPlayer1, null, null, null], // single bar
      backgroundColor: "rgb(135,206,250)",
      xAxisID: "x2", // separate axis
      skipNull: true,
    },
    {
      label: "Player 1",
      data: [null, null, null, -analyticsStore.acesPlayer1, null, null], // single bar
      backgroundColor: "rgb(135,206,250)",
      xAxisID: "x3", // separate axis
      skipNull: true,
    },
    {
      label: "Player 1",
      data: [null, null, null, null, -analyticsStore.doubleFaultsPlayer1, null], // single bar
      backgroundColor: "rgb(135,206,250)",
      xAxisID: "x4", // separate axis
      skipNull: true,
    },
    {
      label: "Player 1",
      data: [null, null, null, null, null, -analyticsStore.firstServePercentagePlayer1], // single bar
      backgroundColor: "rgb(135,206,250)",
      xAxisID: "x5", // separate axis
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
      min: -((analyticsStore.unforcedErrorsPlayer1 || 0) + (analyticsStore.unforcedErrorsPlayer2 || 0)),
      max: 0,
      grid: { display: false },
      ticks: {
        display: false, // 👈 hides "Unforced Errors", etc.
      },
    },
    x1: {
      type: "linear",
      position: "top",
      min: -10,
      max: 0,
      grid: { display: false },
      display: false, // if you don’t want to show the axis
      ticks: {
        display: false, // 👈 hides "Unforced Errors", etc.
      },
    },
    x2: {
      type: "linear",
      position: "top",
      min: -10,
      max: 0,
      grid: { display: false },
      display: false, // if you don’t want to show the axis
      ticks: {
        display: false, // 👈 hides "Unforced Errors", etc.
      },
    },
    x3: {
      type: "linear",
      position: "top",
      min: -10,
      max: 0,
      grid: { display: false },
      display: false, // if you don’t want to show the axis
      ticks: {
        display: false, // 👈 hides "Unforced Errors", etc.
      },
    },
    x4: {
      type: "linear",
      position: "top",
      min: -10,
      max: 0,
      grid: { display: false },
      display: false, // if you don’t want to show the axis
      ticks: {
        display: false, // 👈 hides "Unforced Errors", etc.
      },
    },
    x5: {
      type: "linear",
      position: "top",
      min: -10,
      max: 0,
      grid: { display: false },
      display: false, // if you don’t want to show the axis
      ticks: {
        display: false, // 👈 hides "Unforced Errors", etc.
      },
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

// async function getStats() {
//   let summary = {};
//   // const currentMatchID = this.matchScoreStore.currentMatchID;
//   const currentMatchID = "Isn1axIB2VyMLpcESRyI";
//   console.log("currentMatchID:", currentMatchID);
//   // const player1 = this.matchInfoStore.player1FullName;
//   const player1 = "Finley Buelte";
//   console.log("player1:", player1);
//   // const player2 = this.matchInfoStore.player2FullName;
//   const player2 = "Wooster 1";
//   // console.log("player2:", player2);
//   try {
//     summary = await getMatchSummary(currentMatchID, player1, player2);
//   } catch (error) {
//     console.log("error getting match summary" + error);
//     return;
//   }
//   // Update match summary for player1
//   analyticsStore.unforcedErrors = summary[player1].unforcedErrors;
//   analyticsStore.forcedErrors = summary[player1].forcedErrors;
//   analyticsStore.winners = summary[player1].winners;
//   analyticsStore.aces = summary[player1].aces;
//   analyticsStore.doubleFaults = summary[player1].doubleFaults;
//   analyticsStore.firstServePercentage =
//     summary[player1].firstServePercentage;
//   analyticsStore.deucePoints = summary[player1].deucePoints;
//   analyticsStore.deucePointsWon = summary[player1].deucePointsWon;
// }
</script>
