<template>
  <v-container fluid class="landing-page pa-0">
    <div class="background">
    <!-- Hero Section -->
    <section class="hero d-flex flex-column align-center justify-center text-center">
      <h1 class="display-2 font-weight-bold">Courtside Companion</h1>
      <p class="subtitle-1 mt-3 mb-6">
        The most comprehensive tennis stats app you've ever seen.
      </p>
      <v-btn color="gold_light" size="large" class="elevation-2" to="/newmatch">Start Tracking</v-btn>
    </section>

    <!-- Features Section -->
    <section class="features py-12 px-6 text-center">
      <h2 class="mb-6 text-h4 font-weight-bold">What You’ll Get</h2>
      <v-row dense>
        <v-col cols="12" md="4">
          <h3 class="text-h6 font-weight-bold mb-2">📊 Deep Analytics</h3>
          <p>Serving success by location, most common errors, and rally length.</p>
        </v-col>
        <v-col cols="12" md="4">
          <h3 class="text-h6 font-weight-bold mb-2">📈 Momentum Graphs</h3>
          <p>Visualize the flow of the match in real time.</p>
        </v-col>
        <v-col cols="12" md="4">
          <h3 class="text-h6 font-weight-bold mb-2">🎯 Performance Insights</h3>
          <p>Identify key patterns, strengths, and areas to improve.</p>
        </v-col>
      </v-row>
    </section>

    <!-- Footer CTA -->
    <section class="footer-cta d-flex flex-column align-center justify-center text-center">
      <h2 class="text-h5 font-weight-bold">Ready to win smarter?</h2>
      <v-btn color="gold_light" size="large" class="mt-4" to="/analytics">View Your Stats</v-btn>
    </section>
  </div>
  </v-container>
</template>

<style scoped>
.hero {
  min-height: 80vh;
  background: linear-gradient(135deg, #1e1e1e, #333);
  color: white;
  padding: 4rem 2rem;
}

.features {
  background-color: #f4f4f4;
  color: #333;
}

.footer-cta {
  min-height: 40vh;
  background-color: #222;
  color: white;
  padding: 3rem 2rem;
}

.background {
  position: relative;
  z-index: 1;
  min-height: 100vh;
}

.background::before {
  content: "";
  position: fixed; /* fixed so it stays on scroll */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("../../assets/interview.png") center center / cover no-repeat;
  opacity: 0.4; /* lower is cleaner; tweak as needed */
  z-index: -1;
  pointer-events: none;
  filter: brightness(1.1) contrast(1.05); /* optional for clarity */
}
</style>
