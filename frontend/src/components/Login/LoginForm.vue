<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { logIn } from '../../api';

const router = useRouter();
const userName = ref("");
const password = ref("");

const toastOptions = {
  position: "top-right",
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  icon: true,
  rtl: false,
};

const submit = async () => {
  const response = await logIn(userName.value, password.value);

  if (response.stat === 200) {
    localStorage.setItem('token', response.token);
    toast.success("Successfully logged in.", toastOptions)
    router.push({ name: 'profile', params: { username: userName.value } });
  } else if (response.stat === 404) {
    toast.error("Error 404 - Username not found.", toastOptions);
  } else {
    toast.error("Error 401 - Password invalid.", toastOptions);
  }


}
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <v-form @submit.prevent="submit" class="bg-gray-300 p-6 rounded-md shadow-lg">
      <h1 class="text-xl mb-12 italic font-bold">Log in and share your memories!</h1>


      <v-col>
        <v-text-field v-model="userName" label="Username" prepend-icon="mdi-account" @keyup.enter="submit"></v-text-field>
      </v-col>

      <v-col>
        <v-text-field v-model="password" type="password" label="Password" prepend-icon="mdi-lock"
          @keyup.enter="submit"></v-text-field>
      </v-col>

      <v-btn color="green" @click="submit">Log in!</v-btn>
    </v-form>
  </div>
</template>