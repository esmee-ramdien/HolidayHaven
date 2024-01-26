<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getPost, likePost, unlikePost, comment, delComment, delPost, findUserById } from '../api';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const post = ref({
    _id: '',
    title: '',
    photo: '',
    likes: [],
    comments: [],
    author: '',
    caption: '',
    country: ''
});
const router = useRouter();
const userComment = ref("");
const authUser = ref("");
const toastOptions = {
    position: "top-right",
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    icon: true,
    rtl: false,
};

const parseJwt = (token: string) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

const object = parseJwt(localStorage.getItem('token') ?? '');
const userId = object.userId;

onMounted(async () => {
    const { id } = router.currentRoute.value.params;
    const userPost = await getPost(id);
    const myUser = await findUserById(userId)

    authUser.value = myUser
    post.value = userPost;


});

const like = async (postId: string) => {
    const updatedLikes = await likePost(postId);
    post.value.likes = updatedLikes;

};

const unlike = async (postId: string) => {
    const updatedLikes = await unlikePost(postId);
    post.value.likes = updatedLikes;
};

const placeComment = async (postId: string, commentIn: string) => {
    if (!userComment.value) {
        toast.error("Cannot post empty comment.", toastOptions);
    } else {
        const updatedComments = await comment(postId, commentIn);
        post.value.comments = updatedComments;
    }
    userComment.value = '';
}

const deleteComment = async (postId: string, commentId: string) => {
    const updatedComments = await delComment(postId, commentId);
    post.value.comments = updatedComments;
}

const deletePost = async (postId: string) => {
    await delPost(postId);
    router.push({ name: 'profile', params: { username: router.currentRoute.value.params.username } });
}

</script>

<template>
    <div class="flex justify-center items-center mt-10 ">
        <div class="w-96">
            <v-card color="blue-grey-lighten-4">
                <div class="flex justify-end p-3">
                    <v-menu v-if="post.author === userId" transition="slide-x-transition">
                        <template v-slot:activator="{ props }">
                            <v-btn color="light-green-darken-1" v-bind="props" icon> <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item color="red" @click="deletePost(post._id)">
                                <v-list-item-title> Delete post
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>

                <div class="p-6">
                    <v-card-title>
                        <h3 class="text-2xl font-semibold flex justify-center">{{ post.title }}</h3>
                    </v-card-title>

                    <div class="flex justify-center">
                        <img :src="post.photo" alt="Post Image" class="w-[900px] mb-4">
                    </div>

                    <div class="mb-3">
                        <v-card-subtitle>
                            Country: {{ post.country }}
                        </v-card-subtitle>
                    </div>

                    <div class="flex justify-center items-center mb-6 gap-8">

                        <v-btn color="light-green-darken-1"
                            v-if="post.likes?.find(l => l !== userId) || post.likes?.length === 0" @click="like(post._id)"
                            size="small" prepend-icon="mdi-thumb-up-outline">Like</v-btn>
                        <v-btn color="red-darken-2" v-else @click="unlike(post._id)" size="small"
                            prepend-icon="mdi-thumb-down-outline">Unlike</v-btn>

                        <p class="text-sm">Likes: {{ post.likes?.length ?? 0 }}</p>

                    </div>


                    <div class="flex flex-col space-x-3 mb-3">
                        <p>{{ post.caption }}</p>
                    </div>

                    <div v-if="post.comments?.length > 0">
                        <h1 class="text-sm">Comments</h1>

                        <div v-for="comment in post.comments" :key="comment._id" class="flex flex-col mb-3 ">
                            <div class="flex flex-row items-center gap-3">
                                <p class="text-sm ">{{ comment.text }} - {{ comment.postedBy }}</p>
                                <v-btn v-if="authUser === comment.postedBy || post.author === userId"
                                    @click="deleteComment(post._id, comment._id)" color="red-accent-4" icon
                                    size="x-small"><v-icon>mdi-trash-can</v-icon></v-btn>
                            </div>
                        </div>
                    </div>


                    <div class="flex items-center gap-2">
                        <v-text-field v-model="userComment" label="Comment"
                            @keyup.enter="placeComment(post._id, userComment)" />
                        <v-btn color="light-green-darken-1" @click="placeComment(post._id, userComment)">
                            Post</v-btn>
                    </div>

                </div>
            </v-card>
        </div>
    </div>
</template>
  
  
  