<template>
  <v-container
    fluid
    class="fill-height d-flex align-center justify-center full-height"
  >
    <v-card class="pa-4" style="width: 500px">
      <v-card-title class="text-h6 font-weight-bold"
        >Create Account</v-card-title
      >
      <v-card-text>
        <v-form @submit.prevent="handleRegister">
          <v-text-field v-model="email" label="Email" type="email" required />
          <v-text-field
            v-model="password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="togglePasswordVisibility"
            required
          />
          <v-btn
            type="submit"
            color="primary"
            block
            style="text-transform: none"
            >Create Account</v-btn
          >
        </v-form>
        <GoogleLogin title="Sign Up" />
        <ContinueAsGuest />
        <div style="margin-top: 10px">
          Already have an account? <RouterLink to="/login">Login</RouterLink>
        </div>
        <v-alert v-if="error" class="mt-3 text-red">{{ error }}</v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/init";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import GoogleLogin from "./GoogleLogin.vue";
import ContinueAsGuest from "./ContinueAsGuest.vue";

const email = ref("");
const password = ref("");
const error = ref("");
const userStore = useUserStore();
const router = useRouter();
const showPassword = ref(false);

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

const handleRegister = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    userStore.setUser(auth.currentUser);
    userStore.setUserEmail(email.value);
    router.push("/chartmatch");
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<style scoped>
.full-height {
  height: 100vh;
  background: linear-gradient(135deg, #000000, #29333a);
  color: #f4f4f4;
  font-family: "Orbitron", sans-serif;
}
</style>
