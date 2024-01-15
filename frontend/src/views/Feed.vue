<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { getUsers } from '../api';
import { useRouter } from 'vue-router';

const router = useRouter();

const users = ref([{ firstName: '' }, { lastName: '' }, { username: '' }, { _id: '' }]);

onMounted(async () => {
    const userData = await getUsers();
    users.value = userData;
});

const goTo = async (user: string) => {
    router.push({ name: 'profile', params: { username: user } });
}

</script>

<template>
    <p class="text-3xl">Holiday-Haven Users</p>
    <div class="flex justify-center h-screen">
        <div>
            <div v-for="user in users" :key="user._id">
                <p @click="goTo(user.username)" class="text-white hover:bg-violet-600"> {{ user.firstName }} {{
                    user.lastName }}</p>
            </div>
        </div>
    </div>
</template>