<template>
  <v-container class="pa-0">
    <v-row>
      <v-col cols="6" class="pr-1 pt-1">
        <v-btn
          @click="toggleButton1"
          :class="[
            'text-none',
            { selected: buttonStore.activeButtonLeft === id1 },
          ]"
          block
          variant="outlined"
          style="height: 40px; margin: 0"
          >{{ button1 }}</v-btn
        >
      </v-col>
      <v-col cols="6" class="pl-1 pt-1">
        <v-btn
          @click="toggleButton2"
          :class="[
            'text-none',
            { selected: buttonStore.activeButtonRight === id2 },
          ]"
          block
          variant="outlined"
          style="height: 40px; margin: 0"
          >{{ button2 }}</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useButtonStore } from "@/stores/buttonStores";

export default {
  setup(props) {
    const buttonStore = useButtonStore();

    const toggleButton1 = () => {
      buttonStore.setActiveButtonLeft(props.id1);
    };
    const toggleButton2 = () => {
      buttonStore.setActiveButtonRight(props.id2);
    };

    return { buttonStore, toggleButton1, toggleButton2 };
  },
  data() {
    return {};
  },
  props: {
    button1: String,
    button2: String,
    id1: String, 
    id2: String,
  },
};
</script>

<style>
.selected {
  background-color: #fdb71a;
  color: white;
}
</style>
