import { createApp } from 'vue';
import { createStore } from 'vuex'
import './style.css';
import App from './App.vue';
import router from './router';
import Vue3Toastify from 'vue3-toastify';
import vuetify from './plugins/vuetify';

const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

createApp(App)
  .use(router)
  .use(Vue3Toastify, {
    autoClose: 3000,
  })
  .use(vuetify)
  .mount('#app');
