import { createRouter, createWebHistory } from 'vue-router';
import Orders from '../views/Orders.vue';
import Cars from '../views/Cars.vue';

// Definisikan rute
const routes = [
  { path: '/', component: Orders },
  { path: '/cars', component: Cars },
];

// Buat instance router
const router = createRouter({
  history: createWebHistory(), // Mode history untuk URL bersih
  routes
});

export default router;
