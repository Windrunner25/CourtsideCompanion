<template>
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h6">Reset Your Password</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="email"
            label="Enter your email"
            type="email"
            required
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="sendReset">Send Email</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { getAuth, sendPasswordResetEmail } from "firebase/auth";
  
  const dialog = ref(false);
  const email = ref("");
  const auth = getAuth();
  
  function open() {
    dialog.value = true;
  }
  
  function sendReset() {
    if (!email.value) {
      alert("Please enter your email.");
      return;
    }
  
    sendPasswordResetEmail(auth, email.value)
      .then(() => {
        alert("Password reset email sent!");
        dialog.value = false;
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  }
  
  // 👇 Make `open()` accessible from parent
  defineExpose({ open });
  </script>
  