<script setup lang="ts">
import { ref } from 'vue';
import { logIn } from '../../api';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const router = useRouter();
const userName = ref("");
const password = ref("");

const submit = async () => {
  const response = await logIn(userName.value, password.value);

  if (response.message === "Logged in successfully.") {
    localStorage.setItem('token', response.token);
    router.push({ name: 'profile', params: { username: userName.value } });
  } else {
    toast.error("Error!", {
      position: "top-right",
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      icon: true,
      rtl: false
    });
  }


}
</script>

<template>
  <div class="flex justify-center items-center pr-48 h-screen">
    <div class="border-4 border-#e11d48 p-8 rounded flex flex-col items-center ">
      <input type="text" v-model="userName" placeholder="Username" @keyup.enter="submit"
        class="text-center mb-4 p-2 border rounded" />
      <input type="password" v-model="password" placeholder="Password" @keyup.enter="submit"
        class="text-center mb-4 p-2 border rounded" />
      <button @click="submit" class="w-32 bg-green-900 hover:bg-emerald-950 rounded">Log In</button>
    </div>
  </div>
</template>