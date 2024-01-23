<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { findUser } from '../../api';
import { useRouter } from 'vue-router';

const router = useRouter();
const firstName = ref("");
const lastName = ref("");

onMounted(async () => {
    const { username } = router.currentRoute.value.params;
    const userData = await findUser(username);

    firstName.value = userData.firstName;
    lastName.value = userData.lastName;
});

</script>

<template>
    <div class="flex justify-center mt-12 drop-shadow-2xl">
        <h1 class="text-5xl text-slate-300 ">{{ firstName }} {{ lastName }} </h1>
    </div>
</template>