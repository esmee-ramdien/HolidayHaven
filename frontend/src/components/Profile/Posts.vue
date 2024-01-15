<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { retrievePosts, likePost, unlikePost, comment, findUser, delComment, delPost } from '../../api';
import { useRouter } from 'vue-router';

const posts = ref([{ _id: '' }, { title: '' }, { photo: '' }, { likes: '' }, { comments: [] }])
const router = useRouter();

const userComment = ref("");

onMounted(async () => {
    const { username } = router.currentRoute.value.params;
    const userData = await retrievePosts(username);
    posts.value = userData;
});

const like = async (postId: string, postidx: number) => {
    try {
        const updatedLikes = await likePost(postId);
        posts.value[postidx].likes = updatedLikes;

    } catch (error) {
        console.error('Error liking post:', error);
    }
};

const unlike = async (postId: string, postidx: number) => {
    try {
        const updatedLikes = await unlikePost(postId);
        posts.value[postidx].likes = updatedLikes;

    } catch (error) {
        console.error('Error unliking post:', error);
    }
};

const placeComment = async (postId: string, commentIn: string, postidx: number) => {
    const updatedComments = await comment(postId, commentIn);
    posts.value[postidx].comments = updatedComments;
}

const deleteComment = async (postId: string, commentId: string, postidx: number) => {
    const updatedComments = await delComment(postId, commentId);
    posts.value[postidx].comments = updatedComments;
}

const deletePost = async(postId: string) => {
    const updatedPosts = await delPost(postId);
    posts.value = updatedPosts;
}
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <div>
            <div v-for="(post, index) in posts" :key="post._id">
                <h3>{{ post.title }}</h3>

                <img v-if="post.photo" :src="post.photo" alt="Post Image" class="w-24">
                <p v-else>No photo available</p> <br>

                <p>Likes: {{ post.likes }}</p> <br>

                <div class="flex flex-row space-x-24" v-for="comment in post.comments" :key="comment._id">
                    <p>{{ comment.text }} - {{ findUser(comment.postedBy) }}</p>
                    <button @click="deleteComment(post._id, comment._id, index)">Delete</button>
                </div>

                <button @click="like(post._id, index)" type="button"
                    class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-1 mb-1">
                    Like
                </button>

                <button @click="unlike(post._id, index)" type="button"
                    class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-1 mb-1">
                    Unlike
                </button>

                <input v-model="userComment" placeholder="Wauw!" @keyup.enter="placeComment(post._id, userComment, index)">
                <button @click="placeComment(post._id, userComment, index)"> post</button> <br>
                <button @click="deletePost(post._id)" type="button"
                    class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-1 mb-1">
                    Delete post
                </button>
            </div>
        </div>
    </div>
</template>