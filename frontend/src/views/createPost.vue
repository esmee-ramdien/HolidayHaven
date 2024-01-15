<script setup lang="ts">
import { ref } from 'vue';
import { createPost } from '../api';
import { useRouter } from 'vue-router';

const router = useRouter();

const title = ref("");

const file = ref();
const fileToUpload = ref();

const post = async () => {
    if (!fileToUpload.value) {
        //  Create toast with 'Please upload an image'
        return;
    }

    const response = await createPost(title.value, fileToUpload.value);

    if (response === "Post successfully saved.") {
        router.push({ name: 'profile', params: { username: router.currentRoute.value.params.username } });
    } else {
        console.log("nope.");
    }
}

const handleFileChange = async () => {
    const extractedFile = file.value?.files[0];
    fileToUpload.value = await toBase64(extractedFile);
}

const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});
</script>

<template>
    <div class="font-sans mt-80 ml-40">
        <h1 class="text-xl italic font-bold">Share your memories!</h1>
        title: <input type="text" v-model="title" /> <br />
        photo: <input type="file" ref="file" @change="handleFileChange" /> <br />

        <button @click="post" class="w-32 bg-green-900 hover:bg-emerald-950 rounded">Post!</button>
    </div>
</template>