<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
import Appbar from "./components/Appbar.vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/init";
import { useUserStore } from "./stores/userStore";
import { useRouter } from "vue-router";
import { useMatchScoreStore } from "./stores/matchScoreStore";

const scoreStore = useMatchScoreStore();
const userStore = useUserStore();
const router = useRouter();

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ User is signed in:", user.email);
    console.log("User ID", user.uid);
    console.log(user);
    scoreStore.isGuest = false;
    console.log("isGuest", scoreStore.isGuest);
    userStore.setUser(user);
    userStore.setUserEmail(user.email);
    userStore.setUserName(user.email.split("@")[0]);
  } else {
    console.log("🚪 User is signed out");
    scoreStore.isGuest = true;
    console.log("isGuest", scoreStore.isGuest);
    userStore.clearUser();
  }
});
</script>
