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
   }
  ]
});

export default router;