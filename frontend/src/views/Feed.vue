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
    <div class="p-32">
        <v-card>
            <v-list bg-color="blue-grey-lighten-4">
                <v-list-item v-for="(item, i) in users" :key="i" :value="item._id" variant="plain"
                    @click="goTo(item.username ?? '')" prepend-icon="mdi-account">
                    <v-list-item-title v-text="`${item.firstName} ${item.lastName}`"></v-list-item-title>
                </v-list-item>
            </v-list>
        </v-card>
    </div>
</template>