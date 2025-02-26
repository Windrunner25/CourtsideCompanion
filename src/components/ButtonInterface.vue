<template>
  <v-btn @click="togglePage(0)">Set to 0</v-btn>
  <v-btn @click="togglePage(1)">Set to 1</v-btn>

  <div v-if="showButtons === 0">
    <v-card>HELLO WORLD</v-card>
  </div>
  <div v-if="showButtons === 1">
    <PageOne />
  </div>
</template>

<script>
import PageOne from "@/components/PageOne.vue";

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
