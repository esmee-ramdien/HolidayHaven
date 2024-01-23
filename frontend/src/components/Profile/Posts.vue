<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { retrievePosts } from '../../api';
import { useRouter } from 'vue-router';

const posts = ref([{ _id: '' }, { title: '' }, { photo: '' }, { likes: [] }, { comments: [] }, { author: '' }, { caption: '' }, { country: '' }])
const router = useRouter();

onMounted(async () => {
    const { username } = router.currentRoute.value.params;
    const userPosts = await retrievePosts(username);

    posts.value = userPosts;
});

const gotoPost = async (postIndex: number) => {
    const post_id = posts.value[postIndex]._id
    router.push({
        name: 'singlepost',
        params: {
            username: router.currentRoute.value.params.username,
            id: post_id
        }
    });

}
</script>

<template>
    <div class="flex justify-center mt-10">
        <div v-if="posts.length > 0" class="flex justify-center flex-wrap gap-2">

            <div v-for="(post, index) in posts" :key="post._id" class="mb-10 w-64">
                <v-card @click="gotoPost(index)" height="20em" color="blue-grey-lighten-4">
                    <div class="p-6">
                        <v-card-title>
                            <h3 class="text-2xl font-semibold flex justify-center">{{ post.title }}</h3>
                        </v-card-title>

                        <div class="flex justify-center">
                            <img :src="post.photo" alt="Post Image" class="w-[900px] mb-4">
                        </div>

                    </div>
                </v-card>

            </div>
        </div>
        <div v-else class="flex flex-col justify-center items-center text-slate-300">
            No posts
            <v-icon size="x-large">mdi-camera</v-icon>
        </div>
    </div>
</template>
  