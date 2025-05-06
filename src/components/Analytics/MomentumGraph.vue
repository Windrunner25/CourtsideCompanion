<template>
  <div class="chart-container">
    <h2>Momentum Graph</h2>
    <v-btn variant="tonal" color="primary" @click="generateChart"
      >Generate Graph</v-btn
    >
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Chart } from "chart.js/auto";
import { useMatchScoreStore } from "@/stores/matchScoreStore";
import { fetchWinnersOfPoints } from "@/firebase/firebaseService";
import { useMatchInfoStore } from "@/stores/matchInfoStore";
import { fetchScoreChangePoints } from "@/firebase/firebaseService";

const chartRef = ref(null);
const chartInstance = ref(null);
const matchScoreStore = useMatchScoreStore();
const matchInfoStore = useMatchInfoStore();

function computeRollingMomentum(pointWinners, windowSize) {
  const momentumP1 = [];
  const momentumP2 = [];

  for (let i = 0; i < pointWinners.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const window = pointWinners.slice(start, i + 1);

    const p1Count = window.filter((p) => p === "P1").length;
    const p2Count = window.filter((p) => p === "P2").length;
    const total = window.length;

    momentumP1.push(p1Count / total);
    momentumP2.push(p2Count / total);
  }

  return { momentumP1, momentumP2 };
}

async function generateChart() {
  const rawWinners = await fetchWinnersOfPoints(matchScoreStore.currentMatchID);
  const player1 = matchInfoStore.player1FullName;
  const player2 = matchInfoStore.player2FullName;

  const pointWinners = rawWinners.map((name) => {
    if (name === player1) return "P1";
    if (name === player2) return "P2";
    return "Unknown";
  });

  const labelMap = {};
  const allScoreChanges = await fetchScoreChangePoints(
    matchScoreStore.currentMatchID
  );
  const changeoversOnly = filterChangeovers(allScoreChanges)
  changeoversOnly.forEach((p) => {
    let parts = p.matchScore.split(",").map((s) => s.trim());

    // Remove all trailing '0-0' segments
    while (parts.length > 0 && parts.at(-1) === "0-0") {
      parts.pop();
    }

    const trimmedScore = parts.join(",");
    labelMap[p.pointNumber] = trimmedScore;
  });

  const { momentumP1, momentumP2 } = computeRollingMomentum(pointWinners, 24);

  //   Quality Check
  console.log("pointWinners:", pointWinners);
  console.log("momentumP1:", momentumP1);
  console.log("momentumP2:", momentumP2);

  const ctx = chartRef.value.getContext("2d");

  // Destroy previous chart if it exists
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }

  chartInstance.value = new Chart(ctx, {
    type: "line",
    data: {
      labels: pointWinners.map((_, i) => {
        const pointNumber = i + 1;
        return labelMap[pointNumber] || "";
      }),
      datasets: [
        {
          label: "Player 1 Momentum",
          data: momentumP1,
          borderColor: "blue",
          fill: false,
          tension: 0.8,
        },
        {
          label: "Player 2 Momentum",
          data: momentumP2,
          borderColor: "red",
          fill: false,
          tension: 0.8,
        },
      ],
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const pct = (context.parsed.y * 100).toFixed(0);
              return `${context.dataset.label}: ${pct}% of last 5 points`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            autoSkip: false, // Disable automatic skipping
            maxRotation: 0,
            callback: function (val, index) {
              const label = this.getLabelForValue(index);
              return label !== "" ? label : null;
            },
          },
        },
        y: {
          min: 0,
          max: 1,
          title: {
            display: true,
            text: "Rolling Win %",
          },
        },
      },
    },
  });
}

function filterChangeovers(scoreChangePoints) {
  const result = []
  let gameChangeCount = 0

  for (let i = 0; i < scoreChangePoints.length; i++) {
    const score = scoreChangePoints[i].matchScore
    const pointNumber = scoreChangePoints[i].pointNumber

    // Count total number of games in the score string
    const gameCount = score
      .split(',')
      .map(set => {
        const [p1, p2] = set.split('-').map(Number)
        return (isNaN(p1) || isNaN(p2)) ? 0 : p1 + p2
      })
      .reduce((a, b) => a + b, 0)

    if (gameCount > gameChangeCount) {
      gameChangeCount = gameCount
      // First game always included
      if (gameCount === 1 || gameCount % 2 === 1) {
        result.push({ pointNumber, matchScore: score })
      }
    }
  }

  return result
}

</script>

<style scoped>
.chart-container {
  width: 800px; /* or 100% for responsive */
  height: 400px;
  max-width: 100%; /* optional: for responsiveness */
  margin: auto;
}
</style>
