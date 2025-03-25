<template>
  <v-container class="d-flex justify-center align-center">
    <v-card class="score-card">
      <v-card-title class="text-center">Score</v-card-title>
      <v-card-text style="width: 100%">
        <v-row class="custom-v-row">
          <v-col>Player</v-col>
          <v-col> Sets </v-col>
          <v-col> Games </v-col>
          <v-col> Points </v-col>
          <v-col>
            <v-btn
              block
              class="text-none"
              variant="outlined"
              color="primary"
              style="font-size: xx-small; padding: 0; height: 20px"
              @click="scoreStore.switchServer"
              >Switch Server</v-btn
            >
          </v-col>
        </v-row>
        <v-row class="custom-v-row">
          <v-col
            ><ServerDiv
              :serverName="matchInfoStore.player1FirstName"
              :server="1"
          /></v-col>
          <v-col>
            {{ scoreStore.player1MatchScore }}
          </v-col>
          <v-col>
            {{ scoreStore.player1SetScore }}
          </v-col>
          <v-col>
            {{ scoreStore.player1GameScore }}
          </v-col>
          <v-col>
            <ScoreTweakButton :player="1" />
          </v-col>
        </v-row>
        <v-row class="custom-v-row">
          <v-col
            ><ServerDiv
              :serverName="matchInfoStore.player2FirstName"
              :server="2"
          /></v-col>
          <v-col>
            {{ scoreStore.player2MatchScore }}
          </v-col>
          <v-col>
            {{ scoreStore.player2SetScore }}
          </v-col>
          <v-col>
            {{ scoreStore.player2GameScore }}
          </v-col>
          <v-col>
            <ScoreTweakButton :player="2" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { useMatchScoreStore } from "@/stores/matchScoreStore";
import { useMatchInfoStore } from "@/stores/matchInfoStore";
import ServerDiv from "./ServerDiv.vue";
import ScoreTweakButton from "./ScoreTweakButton.vue";

export default {
  setup() {
    const scoreStore = useMatchScoreStore();
    const matchInfoStore = useMatchInfoStore();
    return { scoreStore, matchInfoStore };
  },
};
</script>

<style scoped>
.v-col {
  padding: 0px;
}

.custom-v-row {
  height: 35px;
}

.score-card {
  width: 100%;
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
