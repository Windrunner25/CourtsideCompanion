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
            <v-select
              v-model="player1"
              :items="playerOptions"
              label="DePauw Player"
              item-title="first"
              item-value="fullName"
              @update:modelValue="updatePlayer1"
            ></v-select>
            <v-text-field
              v-model="player2FirstName"
              label="Player 2 First Name"
            ></v-text-field>
            <v-text-field
              v-model="player2LastName"
              label="Player 2 Last Name"
            ></v-text-field>
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
import { addMatch } from "../firebase/firebaseService";

export default {
  setup() {
    const matchInfoStore = useMatchInfoStore();
    return { matchInfoStore };
  },
  data() {
    return {
      player1: null, // Stores the selected player object
      player1FirstName: "",
      player1LastName: "",
      player2FirstName: "",
      player2LastName: "",
      location: "",
      isDialogueOpen: false,
      inputRules: [(v) => !!v || "This field is required"],
    };
  },
  computed: {
    playerOptions() {
      return [
        { first: "Finley", last: "Buelte" },
        { first: "Scott", last: "Anderson" },
        { first: "Will", last: "Cramer" },
        { first: "Sam", last: "Pia" },
        { first: "Diego", last: "Marquez" },
        { first: "Grayson", last: "Zylstra" },
        { first: "Filippo", last: "Fassone" },
        { first: "Roee", last: "Sela" },
        { first: "Evan", last: "Uhl" },
        { first: "Teagan", last: "Crow" },
        { first: "Brian", last: "Wolf" },
      ].map((player) => ({
        ...player,
        fullName: `${player.first} ${player.last}`,
      }));
    },
  },
  methods: {
    open() {
      this.isDialogueOpen = true;
    },
    close() {
      this.isDialogueOpen = false;
    },
    updatePlayer1(selectedFullName) {
      const selectedPlayer = this.playerOptions.find(
        (player) => player.fullName === selectedFullName
      );
      if (selectedPlayer) {
        this.player1FirstName = selectedPlayer.first;
        this.player1LastName = selectedPlayer.last;
      }
    },
    async save() {
      if (this.inputRules) {
        const player1Name = `${this.player1FirstName} ${this.player1LastName}`;
        const player2Name = `${this.player2FirstName} ${this.player2LastName}`;

        this.matchInfoStore.setPlayer1FirstName(this.player1FirstName);
        this.matchInfoStore.setPlayer1LastName(this.player1LastName);
        this.matchInfoStore.setPlayer2FirstName(this.player2FirstName);
        this.matchInfoStore.setPlayer2LastName(this.player2LastName);
        this.matchInfoStore.setLocation(this.location);
        this.matchInfoStore.setDate();

        const matchDetails = {
          player1FirstName: this.matchInfoStore.player1FirstName,
          player1LastName: this.matchInfoStore.player1LastName,
          player1Team: "DePauw",
          player2FirstName: this.matchInfoStore.player2FirstName,
          player2LastName: this.matchInfoStore.player2LastName,
          player2Team: "Opponent",
          IndoorsOutdoors: this.matchInfoStore.location,
          date: this.matchInfoStore.date || new Date().toISOString(), // Default to today
        };

        try {
          this.matchInfoStore.currentMatchID = await addMatch(matchDetails);
          console.log("Match successfully saved!");
        } catch (error) {
          console.error("Failed to save match:", error);
        }
        this.close();
      }
    },
  },
};
</script>
