<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useUserStore } from './store/user'

const userStore = useUserStore();
const router = useRouter();
const showSearchBar = ref(false);
const searchQuery = ref('');

const gotoProfile = async () => {
  if (userStore.isAuthenticated) {
    router.push({ name: 'profile', params: { username: userStore.authenticatedUser } });
  } else {
    // userStore.setAuthentication(false);
    router.push({ name: 'home' });
  }
}

const goToFeed = async () => {
  if (userStore.isAuthenticated) {
    router.push({ name: 'feed' });
  } else {
    router.push({ name: 'home' });
  }
}

const goToCreatePost = async () => {
  if (userStore.isAuthenticated) {
    router.push({ name: 'createpost', params: { username: userStore.authenticatedUser } });
  } else {
    router.push({ name: 'home' });
  }
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

        <v-btn v-if="userStore.isAuthenticated" @click="toggleSearch" color="light-green-darken-1">
          <v-icon>mdi-magnify</v-icon>
          <v-tooltip v-if="!showSearchBar" activator="parent" location="start">Open search bar</v-tooltip>
          <v-tooltip v-else activator="parent" location="start">Collapse search bar</v-tooltip>
        </v-btn>

        <v-text-field v-if="showSearchBar" v-model="searchQuery" label="Search users or countries"></v-text-field>

        <v-btn v-if="userStore.isAuthenticated" @click="goToFeed" color="light-green-darken-1">Go to Feed</v-btn>
        <v-btn v-if="userStore.isAuthenticated" @click="goToCreatePost" color="light-green-darken-1">Create Post</v-btn>
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