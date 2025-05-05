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
            <v-combobox
              style="margin-bottom: 0"
              v-model="player1"
              :items="playerOptions"
              :rules="[twoWordRule]"
              item-title="label"
              :return-object="false"
              label="Home Player Name"
              density="comfortable"
            />
            <v-combobox
              style="margin-bottom: 0"
              v-model="player2"
              :items="playerOptions"
              :rules="[twoWordRule]"
              item-title="label"
              :return-object="false"
              label="Away Player Name"
              density="comfortable"
            />
            <v-text-field
              v-model="player2Team"
              label="Away Team"
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

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useMatchInfoStore } from "@/stores/matchInfoStore";
import { useMatchScoreStore } from "@/stores/matchScoreStore";
import { useButtonStore } from "@/stores/buttonStores";
import { addMatch } from "../../firebase/firebaseService";
import { addPlayerToPlayersCollection } from "../../firebase/firebaseService";
import { checkIfPlayerExists } from "../../firebase/firebaseService";
import { getPlayerList } from "../../firebase/firebaseService";
import { auth } from "@/firebase/init";
import { getFirestore, collection, getDocs, query } from "firebase/firestore";
import { useRouter } from "vue-router";

const router = useRouter();
const db = getFirestore();
const playerOptions = ref([]);

// Stores
const matchInfoStore = useMatchInfoStore();
const matchScoreStore = useMatchScoreStore();
const buttonStore = useButtonStore();

// Form state
const isDialogueOpen = ref(false);
const form = ref(null);
const player1 = ref("");
const player2 = ref("");
const player2Team = ref("");
const location = ref("");
const server = ref("");
const indoorsOutdoors = ["Indoors", "Outdoors"];
const servers = ["Home", "Away"];
const inputRules = [(v) => !!v || "This field is required"];
const twoWordRule = (value) => {
  const label = typeof value === "string" ? value : value?.label || "";
  return label.trim().split(/\s+/).length === 2 || "Please enter exactly two words (first and last name)";
};

onMounted(async () => {
  playerOptions.value = await getPlayerList();
});

function close() {
  isDialogueOpen.value = false;
}

async function save() {
  console.log("Player 1 name:", player1.value);
  const player1Name = player1.value.trim();
  let [player1FirstName = "", player1LastName = ""] = player1Name.split(" ");
  player1FirstName = player1FirstName.trim();
  player1LastName = player1LastName.trim();

  const player2Name = player2.value.trim();
  let [player2FirstName, player2LastName] = player2Name.split(" ");
  player2FirstName = player2FirstName.trim();
  player2LastName = player2LastName.trim();

  if (!player1Name || !player2Name) return;

  const player1Exists = await checkIfPlayerExists(player1Name);
  if (!player1Exists) {
    await addPlayerToPlayersCollection(player1Name);
    playerOptions.value.push({ label: player1Name });
  }

  const player2Exists = await checkIfPlayerExists(player2Name);
  if (!player2Exists) {
    await addPlayerToPlayersCollection(player2Name);
    playerOptions.value.push({ label: player2Name });
  }

  const validation = await form.value.validate();
  if (!validation.valid) return;

  matchInfoStore.setPlayer1FirstName(player1FirstName);
  matchInfoStore.setPlayer1LastName(player1LastName);
  matchInfoStore.setPlayer2FirstName(player2FirstName);
  matchInfoStore.setPlayer2LastName(player2LastName);
  matchInfoStore.setPlayer2Team(player2Team.value);
  matchInfoStore.setLocation(location.value);
  matchInfoStore.setDate();
  matchInfoStore.setOwnerID(auth.currentUser?.uid);

  const matchDetails = {
    player1FirstName: player1FirstName,
    player1LastName: player1LastName,
    player1Team: "DePauw",
    player2FirstName: player2FirstName,
    player2LastName: player2LastName,
    player2Team: player2Team.value,
    IndoorsOutdoors: location.value,
    Date: matchInfoStore.date || new Date().toISOString(),
    OwnerID: matchInfoStore.OwnerID,
    points: [],
  };

  matchScoreStore.setServer(server.value === "Away" ? 2 : 1);

  try {
    matchScoreStore.currentMatchID = await addMatch(matchDetails);
  } catch (error) {
    console.error("Failed to save match:", error);
  }

  router.push("/chartmatch");
  close();
}
</script>
