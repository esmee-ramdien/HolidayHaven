<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToSignup = async () => {
  router.push('/signup');
}

const goToLogin = () => {
  router.push('/login');
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <p class="mb-2 text-slate-300">Don't have an account yet?</p>
    <v-btn @click="goToSignup" color="green">Register Now!</v-btn> <br>

    <p class="mb-2 mt-4 text-slate-300">Already have an account?</p>
    <v-btn @click="goToLogin" color="green">Log In!</v-btn>
  </div>
</template>