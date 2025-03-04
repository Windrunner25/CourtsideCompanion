<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title> Courtside Companion </v-app-bar-title>

    <v-btn class="text-none" to="/">
      <v-icon>mdi-record-circle-outline</v-icon>
      Track Matches
    </v-btn>
    <v-btn class="text-none" to="/analytics">
      <v-icon>mdi-google-analytics</v-icon>
      Analytics
    </v-btn>
    <v-btn class="text-none" to="/about">
      <v-icon>mdi-information-outline</v-icon>
      About
    </v-btn>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>
