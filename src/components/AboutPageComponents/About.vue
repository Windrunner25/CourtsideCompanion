<template>
    <v-container class="learn-more-container py-10">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="pa-6" elevation="5">
            <v-card-title class="text-center text-h4 font-weight-bold mb-6">
              Learn More
            </v-card-title>
  
            <v-expansion-panels multiple>
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <v-icon start>mdi-lightbulb-on-outline</v-icon>
                  Inspiration
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  Within the tennis community, players and coaches are consumed with statistics...
                </v-expansion-panel-text>
              </v-expansion-panel>
  
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <v-icon start>mdi-target-variant</v-icon>
                  Goal
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  "Courtside Companion" is a webapp that can be used via laptop or phone...
                </v-expansion-panel-text>
              </v-expansion-panel>
  
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <v-icon start>mdi-clipboard-text-outline</v-icon>
                  Usage
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  After appropriate data is collected, "Courtside Companion" populates a report...
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  // no extra imports needed unless you want fancy transitions
  </script>
  
  <style scoped>
  .learn-more-container {
    background-color: #f5f5f5; /* soft background */
    min-height: 100vh;
  }
  
  .v-card {
    border-radius: 20px;
  }
  
  .v-expansion-panel-title {
    font-weight: bold;
    font-size: 1.3rem;
  }
  
  .v-expansion-panel-text {
    font-size: 1rem;
    color: #555;
  }
  </style>
  