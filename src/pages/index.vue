<script setup lang="ts">
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
    class="d-flex justify-center align-center text-center full-height"
  >
    <div class="headline-text">
      Welcome to <span class="highlight">Courtside</span>
    </div>
    <div>
      <div @click="login">Login</div>
      <div @click="signUp">Signup</div>
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
</style>
