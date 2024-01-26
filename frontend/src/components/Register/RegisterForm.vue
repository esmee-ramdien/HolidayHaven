<script setup lang="ts">
import { ref } from 'vue';
import { logIn, signUp } from '../../api';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {useUserStore} from '../../store/user'

const userStore = useUserStore();
const router = useRouter();
const userName = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const toastOptions = {
      position: "top-right",
      timeout: 5000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: true,
      rtl: false
    }

const submit = async () => {
  const response = await signUp(userName.value, password.value, firstName.value, lastName.value);

  if (response.stat === 201) {
    const response = await logIn(userName.value, password.value);
    localStorage.setItem('token', response.token);
    userStore.setUserAuthentication(userName.value);
    router.push({ name: 'profile', params: { username: userName.value } });
  } else {
    toast.error("Error 409 - Username already taken.", toastOptions);
  }
}
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <v-form @submit.prevent="submit" class="bg-gray-300 p-6 rounded-md shadow-lg">
      <h1 class="text-xl mb-12 italic font-bold">Create a Holiday-Haven account and share your memories!</h1>
      <v-col>
        <v-text-field v-model="userName" label="Username" prepend-icon="mdi-account"></v-text-field>
      </v-col>

      <v-col>
        <v-text-field v-model="password" label="Password" type="password" prepend-icon="mdi-lock"></v-text-field>
      </v-col>

      <v-col>
        <v-text-field v-model="firstName" label="First Name" prepend-icon="mdi-account-details-outline"></v-text-field>
      </v-col>

      <v-col>
        <v-text-field v-model="lastName" label="Last Name" prepend-icon="mdi-account-details-outline"></v-text-field>
      </v-col>

      <v-btn color="green" @click="submit">Sign up!</v-btn>
    </v-form>
  </div>
</template>

