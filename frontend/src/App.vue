<script setup lang="ts">
import { useRouter } from 'vue-router';
import { findAuthUser } from './api';
const router = useRouter();

const goTo = async () => {
    const loggedInUser = await findAuthUser();
    router.push({ name: 'profile', params: { username: loggedInUser.username } });
}
</script>

<template> 
<div>
  <div class=" absolute top-3 right-3">
    <img @click="goTo" src="./assets/HHicon.png" alt="logo" class=" h-24 shadow-xl rounded-lg">
  </div>
  <router-view> 
    
  </router-view>
</div>

</template>
