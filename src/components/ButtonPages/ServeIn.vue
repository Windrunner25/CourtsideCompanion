

<template>
    <v-btn-toggle v-model="selected" color="primary" divided>
      <v-btn :value="1">Option 1</v-btn>
      <v-btn :value="2">Option 2</v-btn>
      <v-btn :value="3">Option 3</v-btn>
    </v-btn-toggle>
  
    <p>Selected: {{ selected }}</p>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selected: null, // Stores selected button value
      };
    },
  };
  </script>
  