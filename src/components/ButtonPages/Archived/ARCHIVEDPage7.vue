<template>
  <v-row>
    <v-col cols="6" style="padding: 0px">
      <div style="display: flex; justify-content: center">
        {{ matchDetailsStore.player1FirstName }} hit a ...
      </div>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="6">
      <TwoButtonRow
        :button1="'Offensive'"
        :id1="'Offensive'"
        :color1="'#964B00'"
        :group1="1"
        :button2="'Defensive'"
        :id2="'Defensive'"
        :color2="'#964B00'"
        :group2="1"
        :side="'Left'"
      />
      <SingleButtonRow2
        :button1="'Neutral'"
        :id1="'Neutral'"
        :color1="'#964B00'"
        :group1="1"
        :side="'Left'"
      />
      <TwoButtonRow
        :button1="'Forehand'"
        :id1="'Forehand'"
        :color1="'#29333a'"
        :group1="2"
        :button2="'Backhand'"
        :id2="'Backhand'"
        :color2="'#29333a'"
        :group2="2"
        :side="'Left'"
      />
      <TwoButtonRow
        :button1="'Ground'"
        :id1="'Ground'"
        :color1="'#0000FF'"
        :group1="3"
        :button2="'Cross'"
        :id2="'Crosscourt'"
        :color2="'red'"
        :group2="4"
        :side="'Left'"
      />
      <TwoButtonRow
        :button1="'Slice'"
        :id1="'Slice'"
        :color1="'#0000FF'"
        :group1="3"
        :button2="'Middle'"
        :id2="'Middle'"
        :color2="'red'"
        :group2="4"
        :side="'Left'"
      />
      <TwoButtonRow
        :button1="'Volley'"
        :id1="'Volley'"
        :color1="'#0000FF'"
        :group1="3"
        :button2="'Line'"
        :id2="'Line'"
        :color2="'red'"
        :group2="4"
        :side="'Left'"
      />

      <SingleButtonRow
        :button1="'Smash'"
        :id1="'Smash'"
        :color1="'#0000FF'"
        :group1="3"
        :side="'Left'"
      />

      <TwoButtonRow
        :button1="'Lob'"
        :id1="'Lob'"
        :color1="'#0000FF'"
        :group1="3"
        :button2="'Long'"
        :id2="'Long'"
        :color2="'#228B22'"
        :group2="5"
        :side="'Left'"
      />
      <TwoButtonRow
        :button1="'Pass'"
        :id1="'Pass'"
        :color1="'#0000FF'"
        :group1="3"
        :button2="'Net'"
        :id2="'Net'"
        :color2="'#228B22'"
        :group2="5"
        :side="'Left'"
      />
      <TwoButtonRow
        :button1="'Dropshot'"
        :id1="'Dropshot'"
        :color1="'#0000FF'"
        :group1="3"
        :button2="'Wide'"
        :id2="'Wide'"
        :color2="'#228B22'"
        :group2="5"
        :side="'Left'"
      />
    </v-col>
  </v-row>
</template>

<script>
import { useButtonStore } from "@/stores/buttonStores";
import { useMatchInfoStore } from "@/stores/matchInfoStore";
import TwoButtonRow from "./ARCHIVEDTwoButtonRow.vue";
import SingleButtonRow from "./ARCHIVEDSingleButtonRow.vue";
import SingleButtonRow2 from "./ARCHIVEDSingleButtonRow2.vue";

export default {
  setup() {
    const buttonStore = useButtonStore();
    const matchDetailsStore = useMatchInfoStore();
    return { buttonStore, matchDetailsStore };
  },
};
</script>

<style></style>
