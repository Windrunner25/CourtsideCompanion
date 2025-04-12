<template>
  <v-dialog v-model="isDialogueOpen" max-width="500px">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="surface-variant" variant="flat"
        >Start Match</v-btn
      >
    </template>

    <template v-slot:default>
      <v-card>
        <v-card-title>
          <span class="headline">New Match</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-select
              v-model="player1"
              :items="playerOptions"
              label="DePauw Player"
              item-title="first"
              item-value="fullName"
              :rules="inputRules"
              @update:modelValue="updatePlayer1"
            ></v-select>
            <v-text-field
              v-model="player2FirstName"
              label="Player 2 First Name"
              :rules="inputRules"
            ></v-text-field>
            <v-text-field
              v-model="player2LastName"
              label="Player 2 Last Name"
              :rules="inputRules"
            ></v-text-field>
            <v-select
              v-model="location"
              :items="indoorsOutdoors"
              label="Indoors/Outdoors"
              :rules="inputRules"
            ></v-select>
            <v-select
              v-model="server"
              :items="servers"
              label="Who is serving first?"
              :rules="inputRules"
            ></v-select>
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
import { addMatch } from "../../firebase/firebaseService";
import { useMatchScoreStore } from "@/stores/matchScoreStore";
import { useButtonStore } from "@/stores/buttonStores";
import { auth } from "@/firebase/init";

export default {
  setup() {
    const matchInfoStore = useMatchInfoStore();
    const matchScoreStore = useMatchScoreStore();
    const buttonStore = useButtonStore();
    return { matchInfoStore, matchScoreStore, buttonStore };
  },
  data() {
    return {
      player1: null, // Stores the selected player object
      player1FirstName: "",
      player1LastName: "",
      player2FirstName: "",
      player2LastName: "",
      location: "",
      server: "",
      isDialogueOpen: false,
      indoorsOutdoors: ["Indoors", "Outdoors"],
      servers: ["Home", "Away"],
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
        { first: "Jake", last: "Louiselle" },
        { first: "Roee", last: "Sela" },
        { first: "Filippo", last: "Fassone" },
        { first: "Teagan", last: "Crow" },
        { first: "Evan", last: "Uhl" },
        { first: "Hudson", last: "Mosher" },
        { first: "Jaxcen", last: "Hummel" },
        { first: "Wils", last: "Warren" },
        { first: "Chase", last: "Hutchinson" },
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
      const validation = await this.$refs.form.validate();
      if (!validation.valid) {
        console.log("The input rules are NOT valid");
        return;
      }
      const player1Name = `${this.player1FirstName} ${this.player1LastName}`;
      const player2Name = `${this.player2FirstName} ${this.player2LastName}`;

      this.matchInfoStore.setPlayer1FirstName(this.player1FirstName);
      this.matchInfoStore.setPlayer1LastName(this.player1LastName);
      this.matchInfoStore.setPlayer2FirstName(this.player2FirstName);
      this.matchInfoStore.setPlayer2LastName(this.player2LastName);
      this.matchInfoStore.setLocation(this.location);
      this.matchInfoStore.setDate();
      this.matchInfoStore.setOwnerID(auth.currentUser?.uid);

      const matchDetails = {
        player1FirstName: this.matchInfoStore.player1FirstName,
        player1LastName: this.matchInfoStore.player1LastName,
        player1Team: "DePauw",
        player2FirstName: this.matchInfoStore.player2FirstName,
        player2LastName: this.matchInfoStore.player2LastName,
        player2Team: "Opponent",
        IndoorsOutdoors: this.matchInfoStore.location,
        Date: this.matchInfoStore.date || new Date().toISOString(),
        OwnerID: this.matchInfoStore.OwnerID,
        points: [],
      };

      if (this.server === "Away") {
        this.matchScoreStore.setServer(2);
      } else {
        this.matchScoreStore.setServer(1);
      }

      try {
        this.matchScoreStore.currentMatchID = await addMatch(matchDetails);
        console.log("Match successfully saved!");
      } catch (error) {
        console.error("Failed to save match:", error);
      }
      this.buttonStore.togglePage(1);
      this.close();
    },
  },
};
</script>
