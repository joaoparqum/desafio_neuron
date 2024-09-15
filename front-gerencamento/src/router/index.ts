// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import CriarVoo from '../components/CriarVoo.vue';
import TelaPrincipal from '../components/TelaPrincipal.vue';

const routes = [
  { path: '/', component: TelaPrincipal },
  { path: '/adicionar-voo', component: CriarVoo },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
