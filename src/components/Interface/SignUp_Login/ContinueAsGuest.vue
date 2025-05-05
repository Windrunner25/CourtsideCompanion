<template>
  <v-btn class="guest-btn" type="submit" block @click="handleGuestSignIn">
    Continue as Guest
  </v-btn>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleGuestSignIn = async () => {
  try {
    console.log("Signed in as guest");
    router.push("/newmatch");
  } catch (error) {
    console.error("Guest Sign-in error:", error);
  }
};
</script>

<style>
.guest-btn {
  margin-top: 10px;
  text-transform: none;
  background-color: lightgray;
  /* color: white; */
}
</style>
