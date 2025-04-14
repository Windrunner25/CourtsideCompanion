<script setup>
import { onMounted, ref } from 'vue';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const chartRef = ref(null);
let chartInstance;

const labels = [
  'Unforced Errors',
  'Forced Errors',
  'Winners',
  'Aces',
  'Double Faults',
  'Deuce Points Won'
];

const data = {
  labels,
  datasets: [
    {
      label: 'Player 1',
      data: [29, 2, 13, 5, 6, 5], // ← keep positive
      backgroundColor: 'rgba(255, 99, 132, 0.7)',
    },
    {
      label: 'Player 2',
      data: [-21, -4, -8, -1, -2, -2], // ← negative to mirror
      backgroundColor: 'rgba(54, 162, 235, 0.7)',
    }
  ]
};

const options = {
  indexAxis: 'y',
  responsive: true,
  scales: {
    x: {
      stacked: true,
      ticks: {
        callback: function (value) {
          return Math.abs(value); // show all positive numbers
        }
      }
    },
    y: {
      stacked: true
    }
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.dataset.label}: ${Math.abs(context.raw)}`;
        }
      }
    },
    title: {
      display: true,
      text: 'Match Comparison (Player 1 vs Player 2)',
      font: {
        size: 18
      }
    },
    legend: {
      position: 'bottom'
    }
  }
};

onMounted(() => {
  const ctx = chartRef.value.getContext('2d');
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data,
    options
  });
});
</script>

<template>
  <div>
    <canvas ref="chartRef" style="max-height: 450px;"></canvas>
  </div>
</template>
