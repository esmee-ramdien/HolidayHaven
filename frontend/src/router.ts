import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
   {
   path: '/home',
   name: 'home',
   component: () => import('./views/Homepage.vue') 
   },
   {
    path: '/login',
    name: 'login',
    component: () => import('./views/Login.vue')
   },
   {
    path: '/signup',
    name: 'signup',
    component: () => import('./views/Register.vue')
   },
   {
    path: '/profile/:username',
    name: 'profile',
    component: () => import ('./views/Profile.vue')
   },
   {
    path: '/profile/:username/post',
    name: 'createpost',
    component: () => import ('./views/createPost.vue')
   },
   {
    path: '/feed',
    name: 'feed',
    component: () => import ('./views/Feed.vue')
   }
    ]
});

export default router;