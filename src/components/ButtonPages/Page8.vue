<template>
  <v-row>
    <v-col cols="6" />
    <v-col cols="6" style="padding: 0px">
      <div style="display: flex; justify-content: center">
        Player 2 hit a ...
      </div>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="6" />
    <v-col cols="6">
      <PageFiveSixButtons
        :button1="'Offensive'"
        :id1="'offensive'"
        :color1="'#964B00'"
        :group1="2"
        :button2="'Defensive'"
        :id2="'defensive'"
        :color2="'#964B00'"
        :group2="2"
        :side="'Right'"
      />
      <PageFiveSixButtons
        :button1="'Forehand'"
        :id1="'forehand'"
        :color1="'#29333a'"
        :group1="1"
        :button2="'Backhand'"
        :id2="'backhand'"
        :color2="'#29333a'"
        :group2="1"
        :side="'Right'"
      />

      <PageFiveSixButtons
        :button1="'Ground'"
        :id1="'ground'"
        :color1="'#0000FF'"
        :group1="3"
        :button2="'Cross'"
        :id2="'crosscourt'"
        :color2="'red'"
        :group2="4"
        :side="'Right'"
      />
      <PageFiveSixButtons
        :button1="'Slice'"
        :id1="'slice'"
        :color1="'#0000FF'"
        :group1="3"
        :button2="'Middle'"
        :id2="'middle'"
        :color2="'red'"
        :group2="4"
        :side="'Right'"
      />
      <PageFiveSixButtons
        :button1="'Volley'"
        :id1="'volley'"
        :color1="'#0000FF'"
        :group1="3"
        :button2="'Line'"
        :id2="'line'"
        :color2="'red'"
        :group2="4"
        :side="'Right'"
      />

      <SingleButton
        :button1="'Smash'"
        :id1="'smash'"
        :color1="'#0000FF'"
        :group1="3"
        :side="'Right'"
      />

      <PageFiveSixButtons
        :button1="'Lob'"
        :id1="'lob'"
        :color1="'#0000FF'"
        :group1="3"
        :button2="'Long'"
        :id2="'long'"
        :color2="'#228B22'"
        :group2="5"
        :side="'Right'"
      />
      <PageFiveSixButtons
        :button1="'Pass'"
        :id1="'pass'"
        :color1="'#0000FF'"
        :group1="3"
        :button2="'Net'"
        :id2="'net'"
        :color2="'#228B22'"
        :group2="5"
        :side="'Right'"
      />
      <PageFiveSixButtons
        :button1="'Dropshot'"
        :id1="'dropshot'"
        :color1="'#0000FF'"
        :group1="3"
        :button2="'Wide'"
        :id2="'wide'"
        :color2="'#228B22'"
        :group2="5"
        :side="'Right'"
      />
    </v-col>
  </v-row>
</template>

<script>
import { useButtonStore } from "@/stores/buttonStores";
import PageFiveSixButtons from "./PageFiveSixButtons.vue";

export default {
  setup() {
    const buttonStore = useButtonStore();
    return { buttonStore };
  },
  data() {
    return {};
  },
};
</script>

<style></style>
