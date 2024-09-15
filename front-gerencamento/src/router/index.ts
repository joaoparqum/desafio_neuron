// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import CriarVoo from '../components/CriarVoo.vue';
import TelaPrincipal from '../components/TelaPrincipal.vue';
import EditarVoo from '../components/EditarVoo.vue';

const routes = [
  { path: '/', component: TelaPrincipal },
  { path: '/adicionar-voo', component: CriarVoo },
  { path: '/editar-voo', component: EditarVoo}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
