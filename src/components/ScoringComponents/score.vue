<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="score-card">
      <v-card-title class="text-center">Match Score</v-card-title>
      <v-card-text style="width: 100%;">
        <!-- <div class="score">{{ scoreStore.player1GameScore }}</div>
        <span class="vs">VS</span>
        <div class="score">{{ scoreStore.player2GameScore }}</div> -->
        <v-row>
          <v-col> Player 1 </v-col>
          <v-col>
            {{ scoreStore.player1MatchScore }}
          </v-col>
          <v-col>
            {{ scoreStore.player1SetScore }}
          </v-col>
          <v-col>
            {{ scoreStore.player1GameScore }}
          </v-col>
        </v-row>
        <v-row>
          <v-col> Player 2 </v-col>
          <v-col>
            {{ scoreStore.player2MatchScore }}
          </v-col>
          <v-col>
            {{ scoreStore.player2SetScore }}
          </v-col>
          <v-col>
            {{ scoreStore.player2GameScore }}
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
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
</script>

<style scoped>
.score-card {
  width: 100%;
  /* height: 100px; */
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
