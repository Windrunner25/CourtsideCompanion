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
  background-color: white;
  color: #5f6368;
  font-weight: 500;
  text-transform: none;
  border: 1px solid #dadce0;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 6px 16px;
  font-size: 16px;
}

.google-icon {
  height: 20px;
  width: 20px;
}
</style>
