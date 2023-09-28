import VueRouter from 'vue-router'
import PaginaInicial from '@/pages/paginaInicial/index.vue'
import Registro from '@/pages/registro/index.vue'
import Eventos from '@/pages/eventos/index.vue'
import Evento from '@/pages/evento/index.vue'
import Inscricoes from '@/pages/inscricoes/index.vue'
import Validador from '@/pages/validador/index.vue'
import Admin from '@/pages/admin/index.vue'

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
          component: Registro
      },
      {
          path: '/eventos',
          name: 'eventos',
          component: Eventos
      },
      {
          path: '/inscricoes',
          name: 'inscricoes',
          component: Inscricoes
      },
      {
          path: '/evento/:eventoId',
          name: 'evento',
          component: Evento
      },
      {
          path: '/validador',
          name: 'validador',
          component: Validador
      },
      {
          path: '/admin',
          name: 'admin',
          component: Admin
      },
    ]
  })

export default router