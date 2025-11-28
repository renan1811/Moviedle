import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/decifrar',
    name: 'decifrar',
    component: () => import('../views/decifrarView.vue'),
  },
  {
    path: '/tv',
    name: 'TV',
    component: () => import('../views/TvView.vue'),
  },
  {
    path: '/qual',
    name: 'qual',
    component: () => import('../views/QualView.vue'),
  },
  {
    path: '/derrota4',
    name: 'Derrota',
    component: () => import('../components/QualDerrotaComponent.vue'),
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
