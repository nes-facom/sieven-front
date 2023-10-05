import VueRouter from 'vue-router'
import PaginaInicial from '@/pages/paginaInicial/index.vue'
import Registro from '@/pages/registro/index.vue'
import Eventos from '@/pages/eventos/index.vue'
import Evento from '@/pages/evento/index.vue'
import Inscricoes from '@/pages/inscricoes/index.vue'
import Validador from '@/pages/validador/index.vue'
import Admin from '@/pages/admin/index.vue'
import Vue from 'vue'
import apiAdministrador from '../api/resources/administrador';
import store from '@/store';

const router = new VueRouter({
  routes: [
      {
        path: '/',
        name: 'paginaInicial',
        component: PaginaInicial
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
      Vue.$keycloak.authenticated = true
      const basePath = window.location.toString()
      if (!Vue.$keycloak.authenticated) {
        Vue.$keycloak.login({ redirectUri: basePath.slice(0, -1) + to.path })
      } else {
        const adminPass = 'brunno.lewin'
        try {
          //Vue.$keycloak.idTokenParsed.preferred_username
          apiAdministrador.verificarAdmin(adminPass).then( (retorno) =>  {
            console.log(">:D")
            if (retorno.status == 200) {
              const isAdmin = true;
              console.log('rarwarawrawr')
              store.dispatch('updateAdminStatus', isAdmin);
              next();
            } else if (retorno.status == 404){
              next()
            }
          }) 
        } catch (error) {
          next()
          //console.loge(error)
        }
        next()
      }
    } else {
      next()
    }

    if (to.path === '/' && Vue.$keycloak.authenticated) {
      next('/eventos');
    }
  })

export default router