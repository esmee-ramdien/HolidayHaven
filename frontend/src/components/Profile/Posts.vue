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

const deletePost = async (postId: string) => {
    const updatedPosts = await delPost(postId);
    posts.value = updatedPosts;
}
</script>

<template>
    <div class="flex justify-center items-center h-screen">
      <div>
        <div v-for="(post, index) in posts" :key="post._id" class="mb-8 p-6 border border-gray-300 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-4">{{ post.title }}</h3>
  
          <div v-if="post.photo">
            <img :src="post.photo" alt="Post Image" class="w-24 mb-4">
          </div>
          <p v-else class="mb-4">No photo available</p>
  
          <p class="mb-4">Likes: {{ post.likes }}</p>

          <div v-for="comment in post.comments" :key="comment._id" class="flex flex-row items-center space-x-4 mb-2">
            <p class="text-sm">{{ comment.text }} - {{ comment.postedBy }}</p>
            <button @click="deleteComment(post._id, comment._id, index)" class="delete-btn">Delete</button>
          </div>
  
          <div class="flex space-x-4 mb-4">
            <button @click="like(post._id, index)" class="like-btn">Like</button>
            <button @click="unlike(post._id, index)" class="unlike-btn">Unlike</button>
          </div>
  
          <div class="flex space-x-4">
            <input v-model="userComment" placeholder="Wauw!" @keyup.enter="placeComment(post._id, userComment, index)" class="comment-input">
            <button @click="placeComment(post._id, userComment, index)" class="post-btn">Post</button>
          </div>
  
          <button @click="deletePost(post._id)" class="delete-btn">Delete post</button>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .like-btn,
  .unlike-btn,
  .post-btn {
    @apply text-white font-medium rounded-lg text-sm px-5 py-2.5  hover:text-black;
    @apply bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-pink-300;
  }
  
  .delete-btn {
    @apply text-white font-medium rounded-lg text-sm px-4 py-2.5 hover:text-black;
    @apply bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br;
  }
  bg-gradient-to-r from-red-200 to-red-600
  .comment-input {
    @apply p-2 border border-gray-300 rounded focus:outline-none focus:ring-2;
  }
  </style>
  