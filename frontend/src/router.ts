import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { top: 0 }
  //   }
  // },
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
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
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/profile/:username/createpost',
      name: 'createpost',
      component: () => import('./views/createPost.vue')
    },
    {
      path: '/feed',
      name: 'feed',
      component: () => import('./views/Feed.vue')
    },
    {
      path: '/profile/:username/post/:id',
      name: 'singlepost',
      component: () => import('./views/SinglePost.vue')
    }
  ]
});

export default router;