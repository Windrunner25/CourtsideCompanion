<template>
  <div style="display: flex; justify-content: center">Type of shot...</div>
  <v-container class="pa-1">
    <v-row dense>
      <v-col  v-for="type in shotTypes" :key="type" cols="3">
        <v-btn
          block
          class="text-none"
          variant="tonal"
          color="primary"
          style="height: 30px; padding:0px; background-color: #fedb8c"
          >{{ type }}</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>

const shotTypes = ["Ground", "Approach", "Pass", "Slice", "Volley", "Dropshot", "Smash", "Lob"];
</script>
