import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import Vue3Toastify, { ToastContainerOptions } from 'vue3-toastify';vue 
createApp(App)
  .use(router)
  .use(Vue3Toastify, {
    autoClose: 3000,
  })
  .mount('#app');
