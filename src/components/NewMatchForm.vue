<template>
  <v-dialog v-model="isDialogueOpen" max-width="500px">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="surface-variant"
        text="Start Match"
        variant="flat"
      ></v-btn>
    </template>

    <template v-slot:default>
      <v-card>
        <v-card-title>
          <span class="headline">New Match</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="player1" label="Player 1"></v-text-field>
            <v-text-field v-model="player2" label="Player 2"></v-text-field>
            <v-text-field
              v-model="location"
              label="Indoors/Outdoors"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { useMatchInfoStore } from "@/stores/matchInfoStore";

export default {
  setup() {
    const matchInfoStore = useMatchInfoStore();
    return { matchInfoStore };
  },
  data() {
    return {
      player1: "",
      player2: "",
      location: "",
      isDialogueOpen: false,
      inputRules: [(v) => !!v || "This field is required"],
    };
  },
  methods: {
    open() {
      this.isDialogueOpen = true;
    },
    close() {
      this.isDialogueOpen = false;
    },
    save() {
      if (this.inputRules) {
        this.matchInfoStore.setPlayer1Name(this.player1);
        this.matchInfoStore.setPlayer2Name(this.player2);
        this.matchInfoStore.setLocation(this.location);
        this.close();
      }
    },
  },
};
</script>
