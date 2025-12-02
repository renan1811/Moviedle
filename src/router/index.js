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
    path: '/adivinharElenco',
    name: 'adivinharElenco',
    component: () => import('../views/adivinharElencoView.vue'),
  },
  {
    path: '/imagem',
    name: 'Imagem',
    component: () => import('../views/ImageView.vue'),
  },
  {
    path: '/vitoria',
    name: 'Vitoria',
    component: () => import('../components/reutilizaveis/vitoriaComponent.vue'),
  },
  {
    path: '/qual',
    name: 'qual',
    component: () => import('../views/QualView.vue'),
  },
  {
    path: '/derrota4/:score',
    name: 'Derrota',
    component: () => import('../components/QualDerrotaComponent.vue'),
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
