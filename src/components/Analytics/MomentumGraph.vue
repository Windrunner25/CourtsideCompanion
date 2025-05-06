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


  const cleanedScoreChanges = allScoreChanges.map((p) => {
  let parts = p.matchScore.split(",").map((s) => s.trim());

  // Remove all trailing '0-0' segments
  while (parts.length > 0 && parts.at(-1) === "0-0") {
    parts.pop();
  }

  return {
    pointNumber: p.pointNumber,
    matchScore: parts.join(","),
  };
});

const changeoversOnly = filterChangeovers(cleanedScoreChanges);

changeoversOnly.forEach((p) => {
  labelMap[p.pointNumber] = p.matchScore;
});


  const { momentumP1, momentumP2 } = computeRollingMomentum(pointWinners, 24);

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

  let currentSet = ""
  let lastGameCount = -1

  for (const p of scoreChangePoints) {
    const score = p.matchScore
    const pointNumber = p.pointNumber

    const sets = score.split(',').map(s => s.trim())
    const latestSet = sets.at(-1)

    // Log current processing step
    console.log(`Point ${pointNumber} - Score: ${score} - Last set: ${latestSet}`)

    if (!latestSet || !latestSet.includes('-')) continue

    // If we moved to a new set
    if (latestSet !== currentSet) {
      currentSet = latestSet
      lastGameCount = -1
      console.log(`--> New set detected: ${latestSet}`)
    }

    const [p1, p2] = latestSet.split('-').map(Number)

    if (isNaN(p1) || isNaN(p2)) {
      console.warn(`Skipping malformed score at point ${pointNumber}:`, latestSet)
      continue
    }

    const totalGames = p1 + p2

    if (totalGames > lastGameCount) {
      lastGameCount = totalGames

      if (totalGames === 1 || totalGames % 2 === 1) {
        console.log(`✓ Added: ${score} at point ${pointNumber}`)
        result.push({ pointNumber, matchScore: score })
      }
    }
  }

  console.log("Filtered Changeovers:", result)
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
