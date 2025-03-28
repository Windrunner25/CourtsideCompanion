<template>
    <div style="display: flex; justify-content: center">Direction hit...</div>
    <v-container class="pa-1">
      <v-row dense>
        <v-col cols="1.5" />
        <v-col  v-for="direction in shotDirection" :key="direction" cols="3">
          <v-btn
            block
            class="text-none"
            variant="tonal"
            color="primary"
            style="height: 30px; padding:0px; background-color: #fedb8c"
            >{{ direction }}</v-btn
          >
        </v-col>
        <v-col cols="1.5" />
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  
  const shotDirection = ["Cross", "Middle", "Line"];
  </script>
  