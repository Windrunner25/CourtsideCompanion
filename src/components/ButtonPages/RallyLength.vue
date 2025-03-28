<template>
    <div style="display: flex; justify-content: center">Rally Length</div>
    <v-container class="pa-1">
      <v-row dense>
        <v-col  v-for="length in rallyLengths" :key="length" cols="3">
          <v-btn
            block
            class="text-none"
            variant="tonal"
            color="primary"
            style="height: 30px; padding:0px; background-color: #fedb8c"
            >{{ length }}</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  
  const rallyLengths = ["1-5", "6-10", "11-15", "16-20"];
  </script>
  