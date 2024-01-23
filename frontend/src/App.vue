<script setup lang="ts">
import { useRouter } from 'vue-router';
import { findAuthUser } from './api';
import { onMounted, ref } from 'vue';

const router = useRouter();
const isAuthenticated = ref(false);
const showSearchBar = ref(false);
const searchQuery = ref('');

onMounted(async () => {
  const reqUser = await findAuthUser();
  if (reqUser) {
    isAuthenticated.value = true;
  } else {
    router.push({ name: 'home' })
    isAuthenticated.value = false;
  }
})

const gotoProfile = async () => {
  const reqUser = await findAuthUser();

  if (reqUser) {
    router.push({ name: 'profile', params: { username: reqUser } });
  } else {
    router.push({ name: 'home' });
  }
}

const goToFeed = async () => {
  router.push({ name: 'feed' });
}

const goToCreatePost = async () => {
  const reqUser = await findAuthUser();
  router.push({ name: 'createpost', params: { username: reqUser } });
}

const toggleSearch = async () => {
  showSearchBar.value = !showSearchBar.value;
}
</script>

<template>
  <v-app>
    <div>
      <v-app-bar elevate-on-scroll color="grey-darken-4">
        <v-app-bar-title @click="gotoProfile" icon>
          Holiday Haven
          <v-icon>
            <img src=".//assets/logo.svg" alt="SVG Icon" />
          </v-icon>
        </v-app-bar-title>

        <v-btn v-if="isAuthenticated" @click="toggleSearch" color="light-green-darken-1">
          <v-icon>mdi-magnify</v-icon>
          <v-tooltip v-if="!showSearchBar" activator="parent" location="start">Open search bar</v-tooltip>
          <v-tooltip v-else activator="parent" location="start">Collapse search bar</v-tooltip>
        </v-btn>

        <v-text-field v-if="showSearchBar" v-model="searchQuery" label="Search users or countries"></v-text-field>

        <v-btn v-if="isAuthenticated" @click="goToFeed" color="light-green-darken-1">Go to Feed</v-btn>
        <v-btn v-if="isAuthenticated" @click="goToCreatePost" color="light-green-darken-1">Create Post</v-btn>
      </v-app-bar>

      <v-main class="bg-cyan-950" scrollable>
        <router-view>

        </router-view>
      </v-main>
    </div>
  </v-app>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}
</style>