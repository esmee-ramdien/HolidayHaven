import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from './store/user'
import { findUserById } from './api';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'home'
      }
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

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const nonAuthRouteNames = ['home', 'login', 'signup'];

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const userStore = useUserStore();

  userStore.setAuthentication(isAuthenticated);

  if (!isAuthenticated && !nonAuthRouteNames.includes(to.name?.toString() || '')) {
    return next({ name: 'home' });
  }

  if (isAuthenticated && !nonAuthRouteNames.includes(to.name?.toString() || '')) {
    const object = parseJwt(localStorage.getItem('token') ?? '');
    const userId = object.userId;
    const myUser = await findUserById(userId);

    userStore.setUserAuthentication(myUser);
    return next();
  }

  next();
});

export default router;