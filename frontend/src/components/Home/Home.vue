
import { Router } from 'express';
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
  <div class=" absolute top-0 right-0">
    <img src="../../assets/HHlogo.png" alt="logo" class="h-16">
  </div>
    <button @click="goToSignup" class="w-32 bg-green-900 hover:bg-emerald-950 rounded">Register Now!</button> <br/> <br/>
    <button @click="goToLogin" class="w-32 bg-green-900 hover:bg-emerald-950 rounded">Log In</button>
</template>