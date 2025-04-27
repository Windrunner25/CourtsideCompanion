<template>
  <v-btn
    style="margin-top: 10px"
    elevation="1"
    class="google-btn"
    block
    @click="handleGoogleSignIn"
  >
    <img
      src="https://developers.google.com/identity/images/g-logo.png"
      alt="Google Logo"
      class="google-icon"
    />
    {{ title }} with Google
  </v-btn>
</template>

<script setup>
import { auth, signInWithPopup, provider } from "../../../firebase/init";
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  title: String,
});

const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("✅ Signed in with Google:", user.email);
    router.push("/chartmatch");
  } catch (error) {
    console.error("❌ Google Sign-in error:", error);
  }
};
</script>

<style>
.google-btn {
  text-transform: none;
  border: 1px solid #dadce0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.google-icon {
  height: 20px;
  width: 20px;
}
</style>
