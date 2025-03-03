<template>
  <v-row>
    <v-col cols="6" />
    <v-col cols="6">
      <PageFiveSixButtons
        :button1="'Forehand'"
        :id1="'forehand'"
        :color1="'#29333a'"
        :button2="'Backhand'"
        :id2="'backhand'"
        :color2="'#29333a'"
      />
      <PageFiveSixButtons
        :button1="'Offensive'"
        :id1="'offensive'"
        :color1="'red'"
        :button2="'Defensive'"
        :id2="'defensive'"
        :color2="'red'"
      />
      <PageFiveSixButtons
        :button1="'Ground'"
        :id1="'ground'"
        :color1="'red'"
        :button2="'Cross'"
        :id2="'crosscourt'"
        :color2="'red'"
      />
      <PageFiveSixButtons
        :button1="'Slice'"
        :id1="'slice'"
        :color1="'red'"
        :button2="'Middle'"
        :id2="'middle'"
        :color2="'red'"
      />
      <PageFiveSixButtons
        :button1="'Volley'"
        :id1="'volley'"
        :color1="'red'"
        :button2="'Line'"
        :id2="'line'"
        :color2="'red'"
      />
      <PageFiveSixButtons
        :button1="'Smash'"
        :id1="'smash'"
        :color1="'red'"
        :button2="'Long'"
        :id2="'long'"
        :color2="'red'"
      />
      <PageFiveSixButtons
        :button1="'Lob'"
        :id1="'lob'"
        :color1="'red'"
        :button2="'Net'"
        :id2="'net'"
        :color2="'red'"
      />
      <PageFiveSixButtons
        :button1="'Pass'"
        :id1="'pass'"
        :color1="'red'"
        :button2="'Wide'"
        :id2="'wide'"
        :color2="'red'"
      />
      <PageFiveSixButtons
        :button1="'Dropshot'"
        :id1="'dropshot'"
        :color1="'red'"
        :button2="''"
        :id2="''"
        :color2="'red'"
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

<style>

</style>
