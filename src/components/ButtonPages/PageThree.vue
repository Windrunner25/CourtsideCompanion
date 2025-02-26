<template>
    <v-card class="custom-card" elevation="6">
      <v-img
        src="https://source.unsplash.com/400x250/?nature,water"
        height="200px"
        cover
      ></v-img>
  
      <v-card-title>Beautiful Nature</v-card-title>
  
      <v-card-subtitle>Explore the beauty of the world</v-card-subtitle>
  
      <v-card-text>
        Discover breathtaking landscapes and serene locations that inspire and
        rejuvenate the soul.
      </v-card-text>
  
      <v-card-actions>
        <v-btn color="primary" variant="flat"> Learn More </v-btn>
        <v-spacer></v-spacer>
        <v-icon color="gold">mdi-heart</v-icon>
      </v-card-actions>
    </v-card>
  </template>
  
  <style scoped>
  .custom-card {
    max-width: 400px;
    border-radius: 16px;
    overflow: hidden;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }
  
  .custom-card:hover {
    transform: translateY(-5px);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
  }
  </style>
  