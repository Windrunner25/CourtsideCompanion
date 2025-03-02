<!-- <template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card>
          {{ scoreStore.player1Score }}
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          {{ scoreStore.player2Score }}
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useMatchScoreStore } from "@/stores/matchScoreStore";

export default {
  setup() {
    const scoreStore = useMatchScoreStore();
    return { scoreStore };
  },
  data() {
    return {};
  },
};
</script> -->
<template>
    <v-container class="fill-height d-flex justify-center align-center">
      <v-card class="score-card">
        <v-card-title class="text-center">Match Score</v-card-title>
        <v-card-text class="score-container">
          <div class="score">{{ playerOneScore }}</div>
          <span class="vs">VS</span>
          <div class="score">{{ playerTwoScore }}</div>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        playerOneScore: 3, // Example Score
        playerTwoScore: 5,
      };
    },
  };
  </script>
  
  <style scoped>
  .score-card {
    width: 300px;
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #f5f5f5;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
  }
  
  .score-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  
  .score {
    font-size: 36px;
    font-weight: bold;
    color: #2c3e50;
    flex: 1;
  }
  
  .vs {
    font-size: 20px;
    font-weight: bold;
    color: #777;
  }
  </style>
  