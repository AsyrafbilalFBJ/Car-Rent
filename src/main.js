import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import { createVfm } from 'vue-final-modal'

createApp(App)
  .use(router, createVfm)
  .mount('#app')
