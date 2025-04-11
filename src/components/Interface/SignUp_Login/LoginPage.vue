<template>
  <v-container
    fluid
    class="fill-height d-flex align-center justify-center full-height"
  >
    <v-card class="pa-4" style="width: 500px">
      <v-card-title class="text-h6 font-weight-bold">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field v-model="email" label="Email" type="email" required />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
          />
          <v-btn type="submit" color="primary" block>Login</v-btn>
        </v-form>
        <GoogleLogin title="Login"/>
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

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const login = async () => {
  error.value = "";
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    console.log("Logged in user:", userCredential.user);
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
