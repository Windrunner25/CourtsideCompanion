<template>
  <v-app-bar :elevation="2">
    <v-btn style="margin-left: 50px" class="text-none" to="/chartmatch">
      <v-icon>mdi-record-circle-outline</v-icon>
      Track Matches
    </v-btn>
    <v-btn class="text-none" to="/analytics">
      <v-icon>mdi-google-analytics</v-icon>
      Analytics
    </v-btn>
    <v-btn class="text-none" to="/about">
      <v-icon>mdi-information-outline</v-icon>
      About
    </v-btn>
    <v-spacer></v-spacer>
    <div style="margin-right: 20px">👋 Hello, {{ userStore?.name }}</div>
    <v-btn style="margin-right: 50px" @click="handleLogOut" class="text-none"
      ><v-icon>mdi-door</v-icon>Log Out</v-btn
    >
  </v-app-bar>
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { auth } from "@/firebase/init";
import { useRouter } from "vue-router";
import { signOut } from "firebase/auth";

const userStore = useUserStore();
const router = useRouter();

const handleLogOut = async () => {
  try {
    await auth.signOut();
    userStore.clearUser();
    router.push("/login");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
</script>
