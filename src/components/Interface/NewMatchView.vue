<template>
  <div class="background">
    <div class="welcome-box">
      <h1 class="title">🎾 Welcome Back!</h1>
      <p class="subtitle">Ready for some stats?</p>
      <div class="button-wrapper">
        <NewMatchForm />
      </div>
      <div style="margin-top: 10px; margin-bottom: 10px;">OR</div>
      <div class="button-wrapper">
        <MatchDropdown title="Resume Match" />
        <v-btn
          color="surface-variant"
          variant="flat"
          to="/chartmatch"
          style="margin-left: 5px; height: 50px;"
          >Go</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import MatchDropdown from "../Analytics/MatchDropdown.vue";
import NewMatchForm from "./NewMatchForm.vue";
import { useButtonStore } from "@/stores/buttonStores";

const buttonStore = useButtonStore();
</script>

<style scoped>
.background {
  position: relative; /* Enable absolute positioning for children */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* background: linear-gradient(135deg, #fdb71a, #ffcc33); */
  font-family: "Orbitron", sans-serif;
  text-align: center;
  overflow: hidden; /* Prevent image overflow */
  z-index: 1; /* keeps content above background */

}

.background::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("@/assets/roger.jpeg") center center / cover no-repeat;
  opacity: 0.8;
  z-index: -1;
  pointer-events: none;
}

.welcome-box {
  background-color: #1e1e1e;
  color: #f4f4f4;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  animation: fadeInUp 0.8s ease;
  max-width: 500px;
  width: 100%;
  z-index: 1;
}

.title {
  font-size: 2.8rem;
  margin-bottom: 10px;
  color: #fdb71a;
  text-shadow: 0 0 8px rgba(253, 183, 26, 0.4);
}

.subtitle {
  font-size: 1.3rem;
  margin-bottom: 30px;
  color: #cccccc;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}



@keyframes fadeInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
