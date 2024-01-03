<script setup lang="ts">
import { ref } from 'vue';
import { logIn } from '../../api';
import { useRouter } from 'vue-router';

const router = useRouter();
const userName = ref("");
const password = ref("");

const submit = async () => {
  const response = await logIn(userName.value, password.value);

  if (response === "User found.") {
    router.push({ name: 'profile', params: { username: userName.value} });
    console.log("Logged in successfully.");
  } else {
    console.log("Could not log in.")
  }
}
</script>

<template>
  <div class=" absolute top-0 right-0">
    <img src="../../assets/HHlogo.png" alt="logo" class="h-16">
  </div>
  <div class="font-sans place-content-center">
    Username: <input type="text" v-model="userName" /> <br>
    Password: <input type="password" v-model="password" /> <br>

    <button @click="submit" class="w-32 bg-green-900 hover:bg-emerald-950 rounded">Log In</button>
  </div>
</template>