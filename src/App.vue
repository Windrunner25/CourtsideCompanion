<template>
  <v-app>
    <Appbar />
    <router-view />
  </v-app>
</template>

<script setup>
import Appbar from "./components/Appbar.vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/init";
import { useUserStore } from "./stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ User is signed in:", user.email);
    userStore.setUser(user);
    if (
      router.currentRoute.value.path === "/" ||
      router.currentRoute.value.path === "/register"
    ) {
      router.push("/chartmatch");
    }
  } else {
    console.log("🚪 User is signed out");
    userStore.clearUser();
    router.push("/");
  }
});
</script>
