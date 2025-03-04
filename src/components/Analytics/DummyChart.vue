<template>
    <div>
      <ChartJSBar :chart-data="barChartData" :chart-options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { defineComponent, reactive } from "vue";
  import { Chart, registerables } from "chart.js";
  import { ChartJSBar } from "vue-chart-3"; // Import correctly
  
  Chart.register(...registerables);
  
  export default defineComponent({
    components: {
      ChartJSBar, // Register the component
    },
    setup() {
      const barChartData = reactive({
        labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
        datasets: [
          {
            label: "Dummy Data",
            backgroundColor: ["red", "blue", "yellow", "green", "purple"],
            data: [12, 19, 7, 10, 15],
          },
        ],
      });
  
      const chartOptions = reactive({
        responsive: true,
        maintainAspectRatio: false,
      });
  
      return { barChartData, chartOptions };
    },
  });
  </script>
  