<script setup lang="ts">
import { ref } from 'vue';
import { signUp } from '../../api';
import { useRouter } from 'vue-router';

const router = useRouter();

const userName = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");

const submit = async () => {
  const response = await signUp(userName.value, password.value, firstName.value, lastName.value);

  if (response === "User successfully saved.") {
    router.push(name: 'profile');
  } else {
    console.log("Username taken.");
  }
}
</script>

<template>
  <div class=" absolute top-0 right-0">
    <img src="../../assets/HHlogo.png" alt="logo" class="h-16">
  </div>

  <div class="font-sans mt-80 ml-40">
    <h1 class="text-xl italic font-bold">Create a Holiday-Haven account and share your memories!</h1>
    Username: <input type="text" v-model="userName" /> <br />
    Password: <input type="password" v-model="password" /> <br />
    First name: <input type="text" v-model="firstName" /> <br />
    Last name: <input type="text" v-model="lastName" /> <br />

    <button @click="submit" class="w-32 bg-green-900 hover:bg-emerald-950 rounded">Sign up!</button>
  </div>
</template>