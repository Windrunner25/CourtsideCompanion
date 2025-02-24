<template>
  <v-btn @click="togglePage(0)">Set to 0</v-btn>
  <v-btn @click="togglePage(1)">Set to 1</v-btn>

  <v-container class="grid">
    <v-row v-if="(showButtons===0)">
        <v-card>
            Content when set to 0
        </v-card>
    </v-row>
    <v-row v-if="(showButtons===1)">
      <!-- First Column -->
      <v-col cols="6">
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12">
              <v-btn
                block
                class="text-none"
                variant="tonal"
                color="primary"
                style="height: 100px; margin: 0"
                >Serve In</v-btn
              >
            </v-col>
          </v-row>
        </v-container>

        <v-container class="pa-0">
          <v-row>
            <v-col cols="12">
              <v-btn
                block
                class="text-none"
                variant="tonal"
                color="primary"
                style="height: 100px; margin: 0"
                >Fault</v-btn
              >
            </v-col>
          </v-row>
        </v-container>

        <v-container class="pa-0">
          <v-row>
            <v-col cols="12">
              <v-btn
                block
                class="text-none"
                variant="tonal"
                color="primary"
                style="height: 100px; margin: 0"
                >Ace</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <!-- Second Column -->
      <v-col cols="6">
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12">
              <v-btn
                block
                class="text-none"
                variant="tonal"
                color="primary"
                style="height: 200px; margin: 0"
                >Return Winner</v-btn
              >
            </v-col>
          </v-row>
        </v-container>

        <v-container class="pa-0">
          <v-row>
            <v-col cols="12">
              <v-btn
                block
                class="text-none"
                variant="tonal"
                color="primary"
                style="height: 200px; margin: 0"
                >Return Error</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showButtons: 0,
    };
  },
  methods: {
    togglePage(value) {
      this.showButtons = value;
    },
  },
};
</script>

<style>
.grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 600px;
  width: 425px;
  justify-content: center;
  border: 2px solid red; /* Change color as needed */
}
</style>
