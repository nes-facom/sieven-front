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
// import store from '@/store';

const router = new VueRouter({
  routes: [
      {
        path: '/',
        name: 'paginaInicial',
        component: PaginaInicial,
        meta: {
          isAuthenticated: false
        }
      },
      {
        path: '/login',
        name: 'paginaLogin',
        component: PaginaLogin,
        meta: {
          isAuthenticated: false
        }
      },
      {
          path: '/registro',
          name: 'registro',
          component: Registro,
          meta: {
            isAuthenticated: true
          }
      },
      {
          path: '/eventos',
          name: 'eventos',
          component: Eventos,
          meta: {
            isAuthenticated: true
          }
      },
      {
          path: '/inscricoes',
          name: 'inscricoes',
          component: Inscricoes,
          meta: {
            isAuthenticated: true
          }
      },
      {
          path: '/evento/:id',
          name: 'evento',
          component: Evento,
          meta: {
            isAuthenticated: true
          }
      },
      {
          path: '/validador',
          name: 'validador',
          component: Validador,
          meta: {
            isAuthenticated: true
          }
      },
      {
          path: '/admin',
          name: 'admin',
          component: Admin,
          meta: {
            isAuthenticated: true
          }
      },
    ]
  })


  router.beforeEach((to, from, next) => {
    if (to.meta.isAuthenticated) {
      const token = localStorage.getItem('token');
      if (token) {
        next(); 
      } else {
        next('/'); 
      }  
    } else {
      next()
    }
  })

export default router