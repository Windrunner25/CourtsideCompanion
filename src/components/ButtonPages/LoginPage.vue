<template>
    <v-container class="d-flex align-center justify-center" >
      <v-card class="pa-4" style="width: 500px;">
        <v-card-title class="text-h6 font-weight-bold">Login</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              required
            />
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
            />
            <v-btn type="submit" color="primary" block class="mt-3">Login</v-btn>
          </v-form>
          <div v-if="error" class="mt-3 text-red">{{ error }}</div>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { signInWithEmailAndPassword } from 'firebase/auth'
  import { auth } from '../../firebase/init'  
  
  const email = ref('')
  const password = ref('')
  const error = ref('')
  
  const login = async () => {
    error.value = ''
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
      console.log("Logged in user:", userCredential.user)
      alert("Login successful!")
      // Redirect or update UI
    } catch (err) {
      error.value = err.message
    }
  }
  </script>
  
  