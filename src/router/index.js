import VueRouter from 'vue-router'
import PaginaInicial from '@/pages/paginaInicial/index.vue'
import Registro from '@/pages/registro/index.vue'
import Eventos from '@/pages/eventos/index.vue'
import Evento from '@/pages/evento/index.vue'
import Inscricoes from '@/pages/inscricoes/index.vue'
import Validador from '@/pages/validador/index.vue'
import Admin from '@/pages/admin/index.vue'
import PaginaLogin from '@/pages/login/index.vue'
import jwtDecode from 'jwt-decode'
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
          path: `/evento/:id`,
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
    console.log(token)
    if(token === null) {
      store.commit('setPassport', null);
      store.commit('setAdminStatus', false);
      next()
    } else {
      const decodedToken = jwtDecode(token); // Use a biblioteca jwt-decode ou similar
      const nome = decodedToken.nome
      const isAdmin = decodedToken.is_admin
      store.commit('setPassport', nome);
      store.commit('setAdminStatus', isAdmin);

      if (to.path === '/login' || to.path === '/') {
            // Redirecione para a tela de eventos se o usuário estiver logado e tentando acessar a tela de login
          next({ path: '/eventos' });
      } else {
        next();
      }
      next()
    }
    
  })

export default router