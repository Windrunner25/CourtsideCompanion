<template>
    <v-container class="fill-height d-flex align-center justify-center">
      <v-card width="400" elevation="5">
        <v-card-title>Create Account</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleRegister">
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
            <v-btn type="submit" color="primary" block>Create Account</v-btn>
          </v-form>
          <v-alert v-if="errorMessage" type="error" class="mt-4">
            {{ errorMessage }}
          </v-alert>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { auth, createUserWithEmailAndPassword } from '@/firebase/init'
  import { useRouter } from 'vue-router'
  
  const email = ref('')
  const password = ref('')
  const errorMessage = ref('')
  const router = useRouter()
  
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value)
      router.push('/') // redirect after success
    } catch (error) {
      errorMessage.value = error.message
      console.error('Registration error:', error)
    }
  }
  </script>
  