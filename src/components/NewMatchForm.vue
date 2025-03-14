<template>
  <v-dialog :value="dialog" @input="updateDialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">New Match</span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="player1" label="Player 1"></v-text-field>
          <v-text-field v-model="player2" label="Player 2"></v-text-field>
          <v-text-field v-model="location" label="Location"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useMatchInfoStore } from "@/stores/matchInfoStore";

export default {
  props: {
    dialog: Boolean,
  },
  data() {
    return {
      player1: "",
      player2: "",
      location: "",
    };
  },
  methods: {
    updateDialog(value) {
      this.$emit("update:dialog", value);
    },
    close() {
      this.updateDialog(false);
    },
    save() {
      const matchInfoStore = useMatchInfoStore();
      matchInfoStore.setPlayer1(this.player1);
      matchInfoStore.setPlayer2(this.player2);
      matchInfoStore.setLocation(this.location);
      this.close();
    },
  },
};
</script>