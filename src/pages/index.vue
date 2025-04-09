<script setup lang="ts">
</script>

<template>
  <v-container fluid class="d-flex justify-center align-center text-center full-height">
    <div class="headline-text">
      You have reached <span class="highlight">Courtside</span>
    </div>
  </v-container>
</template>

<style scoped>
.full-height {
  height: 100vh;
  background: linear-gradient(135deg, #1e1e2f, #2c2c54);
  color: #f4f4f4;
  font-family: 'Orbitron', sans-serif;
}

.headline-text {
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

.highlight {
  color: #ff4081;
  text-transform: uppercase;
  font-size: 3.5rem;
  letter-spacing: 4px;
  text-shadow: 0 0 15px #ff4081aa;
}
</style>
