<template>
  <v-app-bar :elevation="2" class="custom-app-bar">
    <v-btn style="margin-left: 50px" class="nav-btn text-none" to="/chartmatch">
      <v-icon>mdi-record-circle-outline</v-icon>
      Track Matches
    </v-btn>
    <v-btn class="nav-btn text-none" to="/analytics">
      <v-icon>mdi-google-analytics</v-icon>
      Analytics
    </v-btn>
    <v-btn class="nav-btn text-none" to="/about">
      <v-icon>mdi-information-outline</v-icon>
      About
    </v-btn>
    <v-spacer></v-spacer>
    <div
      class="user-name"
      style="
        margin-right: 20px;
        font-weight: 400;
        font-family: Roboto, sans-serif;
      "
    >
      👋 Hello, {{ userStore?.name }}
    </div>
    <v-btn
      v-if="!scoreStore.isGuest"
      style="margin-right: 50px"
      @click="handleLogOut"
      class="nav-btn text-none"
      >Log Out <v-icon class="ms-2">mdi-logout</v-icon></v-btn
    >
    <v-btn
      v-else
      style="margin-right: 50px"
      @click="handleLogOut"
      class="nav-btn text-none"
      >Sign up or Login <v-icon class="ms-2">mdi-logout</v-icon></v-btn
    >
  </v-app-bar>
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { useMatchScoreStore } from "@/stores/matchScoreStore";
import { auth } from "@/firebase/init";
import { useRouter } from "vue-router";
import { signOut } from "firebase/auth";

const userStore = useUserStore();
const scoreStore = useMatchScoreStore();
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

<style scoped>
.custom-app-bar {
  background: linear-gradient(135deg, #0f0f0f, #2a2a2a) !important;
  color: white;
  font-family: "Orbitron", sans-serif;
}

.nav-btn {
  color: #f4f4f4;
  letter-spacing: 1px;
  font-weight: 500;
  transition: 0.3s ease;
}

.nav-btn:hover {
  color: #fdb71a;
  /* text-shadow: 0 0 2px #fdb71a; */
}

.logout-btn {
  color: white;
  transition: 0.3s ease;
}

.logout-btn:hover {
  color: #f87171;
  text-shadow: 0 0 5px #f87171;
}

.user-name {
  color: #f4f4f4;
  letter-spacing: 1px;
  font-weight: 500;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
}
</style>
