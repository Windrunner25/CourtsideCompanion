<template>
    <div style="display: flex; justify-content: center">*If missed...</div>
    <v-container class="pa-1">
      <v-row dense>
        <v-col cols="1.5" />
        <v-col  v-for="error in errorLocations" :key="error" cols="3">
          <v-btn
            block
            class="text-none"
            variant="tonal"
            color="primary"
            style="height: 30px; padding:0px; background-color: #fedb8c"
            >{{ error }}</v-btn
          >
        </v-col>
        <v-col cols="1.5" />
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  
  const errorLocations = ["Long", "Wide", "Net"];
  </script>
  