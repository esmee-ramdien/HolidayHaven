import { createApp } from 'vue';
import { createPinia } from 'pinia'
import './style.css';
import App from './App.vue';
import router from './router';
import Vue3Toastify from 'vue3-toastify';
import vuetify from './plugins/vuetify';

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(router)
  .use(Vue3Toastify, {
    autoClose: 3000,
  })
  .use(vuetify)
  .mount('#app');
