<template>
  <v-container class="grid">
    <v-row>
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

<script></script>

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
<!-- 
<template>
    <v-container>
      <v-btn @click="showButtons = !showButtons" color="primary">
        Toggle Buttons
      </v-btn>
  
      <div v-if="showButtons">
        <v-btn color="success">Button Set 1</v-btn>
        <v-btn color="success">Button Set 2</v-btn>
      </div>
  
      <div v-else>
        <v-btn color="error">Alternative Button 1</v-btn>
        <v-btn color="error">Alternative Button 2</v-btn>
      </div>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showButtons: true
      };
    }
  };
  </script> -->
