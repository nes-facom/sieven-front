import VueRouter from 'vue-router'
import PaginaInicial from '@/pages/paginaInicial/index.vue'
import Registro from '@/pages/registro/index.vue'
import Eventos from '@/pages/eventos/index.vue'
import Evento from '@/pages/evento/index.vue'
import Inscricoes from '@/pages/inscricoes/index.vue'
import Validador from '@/pages/validador/index.vue'
import Admin from '@/pages/admin/index.vue'
import PaginaLogin from '@/pages/login/index.vue'
// import Vue from 'vue'
// import apiAdministrador from '../api/resources/administrador';
import store from '@/store.js';

const router = new VueRouter({
  
  routes: [
      {
        path: '/',
        name: 'paginaInicial',
        component: PaginaInicial,
      },
      {
        path: '/login',
        name: 'paginaLogin',
        component: PaginaLogin,
      },
      {
          path: '/registro',
          name: 'registro',
          component: Registro,
      },
      {
          path: '/eventos',
          name: 'eventos',
          component: Eventos,
      },
      {
          path: '/inscricoes',
          name: 'inscricoes',
          component: Inscricoes,
      },
      {
          path: '/evento/:id',
          name: 'evento',
          component: Evento,
      },
      {
          path: '/validador',
          name: 'validador',
          component: Validador,
      },
      {
          path: '/admin',
          name: 'admin',
          component: Admin,
      },
    ]
  })


  router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if(!token) {
      store.commit('setPassport', null);
      store.commit('setAdminStatus', false);
      next()
    } else {
      next()
    }
  })

export default router