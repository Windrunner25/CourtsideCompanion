<template>
  <v-container
    fluid
    class="background fill-height d-flex align-center justify-center full-height"
  >
    <v-card class="pa-4" style="width: 500px">
      <v-card-title class="text-h6 font-weight-bold">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field v-model="email" label="Email" type="email" required />
          <v-text-field
            v-model="password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="togglePasswordVisibility"
            required
          />
          <div style="margin-bottom: 10px">
            <div
              @click="openForgotPassword"
              style="cursor: pointer; color: #1976d2"
            >
              Forgot password?
            </div>

            <!-- Child dialog component -->
            <ForgotPassword ref="forgotDialog" />
          </div>
          <v-btn
            type="submit"
            color="primary"
            block
            style="text-transform: none"
            >Login</v-btn
          >
        </v-form>
        <GoogleLogin title="Login" />
        <ContinueAsGuest />
        <div style="margin-top: 10px">
          Need to make an account?
          <RouterLink to="/signup">Create Account</RouterLink>
        </div>
        <v-alert v-if="error" class="mt-3 text-red">{{ error }}</v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/init";
import { useRouter } from "vue-router";
import GoogleLogin from "./GoogleLogin.vue";
import ForgotPassword from "./ForgotPassword.vue";
import ContinueAsGuest from "./ContinueAsGuest.vue";

const forgotDialog = ref();

function openForgotPassword() {
  forgotDialog.value?.open();
}

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();
const showPassword = ref(false);

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

const login = async () => {
  error.value = "";
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    console.log("Logged in user:", userCredential.user);
    router.push("/newmatch");
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

.background {
  position: relative; /* needed for ::before positioning */
  z-index: 1; /* keeps content above background */
}

.background::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("@/assets/tenniscourthard.jpg") center center / cover no-repeat;
  opacity: 0.3;
  z-index: -1;
  pointer-events: none;
}
</style>
