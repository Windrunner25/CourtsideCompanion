<script setup lang="ts">
import ContinueAsGuest from "@/components/Interface/SignUp_Login/ContinueAsGuest.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const login = () => {
  router.push("/login");
};
const signUp = () => {
  router.push("/signup");
};
</script>

<template>
  <v-container
    fluid
    class="background d-flex flex-column justify-center align-center text-center full-height"
  >
    <div class="headline-text">
      Welcome to <span class="highlight">Courtside</span>
    </div>

    <div class="subtitle-text">
      The ultimate tennis stats companion
      <span style="font-style: normal">🎾</span>
    </div>

    <div class="bottom-buttons">
      <v-btn @click="login" color="primary" class="mb-2" block>Login</v-btn>
      <v-btn @click="signUp" color="secondary" block>Create Account</v-btn>
      <ContinueAsGuest />
    </div>
  </v-container>
</template>

<style scoped>
.full-height {
  height: 100vh;
  background: linear-gradient(135deg, #000000, #29333a);
  color: #f4f4f4;
  font-family: "Orbitron", sans-serif;
}

.headline-text {
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

.highlight {
  color: #fdb71a;
  font-size: 3.5rem;
  letter-spacing: 4px;
  text-shadow: 0 0 15px #fedb8c;
}

.bottom-buttons {
  position: absolute;
  bottom: 40px;
  width: 80%;
  max-width: 400px;
}
.subtitle-text {
  font-size: 1.4rem;
  font-weight: 500;
  margin-top: 1rem;
  letter-spacing: 1px;
  color: #a0aec0;
  font-style: italic;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.1);
}

.background {
  position: relative; /* needed for ::before positioning */
  z-index: 1; /* keeps content above background */
}

.background::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("../assets/tenniscourt.jpg") center center / cover no-repeat;
  opacity: 0.3;
  z-index: -1;
  pointer-events: none;
}
</style>
