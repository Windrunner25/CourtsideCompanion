<template>
  <v-container class="d-flex justify-center align-center">
    <v-card class="score-card">
      <v-card-title class="text-center">Score</v-card-title>
      <v-card-text style="width: 100%">
        <v-row class="custom-v-row">
          <v-col cols="4"/>
          <v-col cols="4">
            <v-btn
              class="text-none"
              variant="outlined"
              color="primary"
              style="font-size: x-small; height: 20px;"
              @click="buttonStore.togglePage(8)"
              >Conclude Match</v-btn>
          </v-col>
        </v-row>
        <v-row class="custom-v-row">
          <v-col cols="1"></v-col>
          <v-col cols="5" style="text-align: left">
            <ServerDiv
              :serverName="matchInfoStore.player1FullName"
              :server="1"
            />
          </v-col>
          <v-col cols="1">
            {{ scoreStore.player1Set1 }} <sup>{{ scoreStore.player1TiebreakScoreSet1 }}</sup>
          </v-col>
          <v-col cols="1">
            {{ scoreStore.player1Set2 }} <sup>{{ scoreStore.player1TiebreakScoreSet2 }}</sup>
          </v-col>
          <v-col cols="1">
            {{ scoreStore.player1Set3 }} <sup>{{ scoreStore.player1TiebreakScoreSet3 }}</sup>
          </v-col>
          <v-col cols="1">
            {{ scoreStore.player1GameScore }}
          </v-col>
          <v-col cols="1">
            <ScoreTweakButton :player="1" />
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
        <v-row class="custom-v-row">
          <v-col cols="1"></v-col>
          <v-col cols="5" style="text-align: left">
            <ServerDiv
              :serverName="matchInfoStore.player2FullName"
              :server="2"
            />
          </v-col>
          <v-col cols="1">
            {{ scoreStore.player2Set1 }} <sup>{{ scoreStore.player2TiebreakScoreSet1 }}</sup>
          </v-col>
          <v-col cols="1">
            {{ scoreStore.player2Set2 }} <sup>{{ scoreStore.player2TiebreakScoreSet2 }}</sup>
          </v-col>
          <v-col cols="1">
            {{ scoreStore.player2Set3 }} <sup>{{ scoreStore.player2TiebreakScoreSet3 }}</sup>
          </v-col>
          <v-col cols="1">
            {{ scoreStore.player2GameScore }}
          </v-col>
          <v-col cols="1">
            <ScoreTweakButton :player="2" />
          </v-col>
          <v-col cols="1"></v-col>
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
import { useButtonStore } from "@/stores/buttonStores";

export default {
  setup() {
    const scoreStore = useMatchScoreStore();
    const matchInfoStore = useMatchInfoStore();
    const buttonStore = useButtonStore();
    return { scoreStore, matchInfoStore, buttonStore };
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
