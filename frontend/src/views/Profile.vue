<script lang="ts" setup>
import Credentials from '../components/Profile/Credentials.vue'
import Posts from '../components/Profile/Posts.vue'
import { useRouter } from 'vue-router';
const router = useRouter();


const goToFeed = async () => {
    router.push({ name: 'feed' });
}
const goToCreatePost = async () => {
    router.push({ name: 'createpost', params: { username: router.currentRoute.value.params.username } });
}
</script>

<template>
    <div class="flex flex-row space-x-4">
    <Credentials />
    <button @click="goToFeed" type="button"
        class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-6 py-1.5 text-center me-1 mb-1">
        Go to Feed
    </button>
    <button @click="goToCreatePost" type="button"
        class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Create
        Post</button>
    </div>
    <Posts />
</template>