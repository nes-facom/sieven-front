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
      // Get the actual url of the app, it's needed for Keycloak
      const basePath = window.location.toString()
      if (!Vue.$keycloak.authenticated) {
        // The page is protected and the user is not authenticated. Force a login.
        Vue.$keycloak.login({ redirectUri: basePath.slice(0, -1) + to.path })
      }
      else {
        try {
          apiAdministrador.verificarAdmin(Vue.$keycloak.idTokenParsed.preferred_username).then( (retorno) =>  {
            console.log(retorno)
            if (retorno.status === 200) {
              next();
              console.log('retornou 200')
            }
          }) 
        } catch (error) {
          console.loge(error)
        }

        console.log('debug')
      }
    } else {
      
      next()
    }
  })

export default router