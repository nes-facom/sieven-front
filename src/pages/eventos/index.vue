<template>
  <div id="pgEventos">
    <v-row class="mt-4">
      <v-card v-for="evento in eventos"
              :key="evento.id"
              
              class="mx-auto my-3 mr-10 ml-3"
              id="posicaoBaseEventoCard"
              width="280px"
              height="250px"
              padding="2.5rem"
              hover
              @click="redirecionarEvento(evento.id)">
        <v-img :src="evento.imagem"
               height="130px">
        </v-img>
        <v-card-subtitle class="py-0 font-weight-bold mt-3"
                         style="color: #0088B7">
          {{ formatarData(evento.data_inicial) }} > {{ formatarData(evento.data_final) }}
        </v-card-subtitle>

        <v-card-title>
          {{ evento.nome }}
        </v-card-title>
        <v-card-subtitle class="py-0 font-weight-bold"
                         style="color: #AEAEAE">
                         <v-icon class="mr-1"
                            size="20">
                            mdi-map-marker-outline
                          </v-icon>
          {{ evento.local }}
        </v-card-subtitle>
        
        
      </v-card>


      <v-dialog v-if="$store.getters.isAdmin"
                v-model="criarEventoDialog"
                width="700">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-if="isAdmin"
                color="primary"
                 large
                 fixed
                 right
                 bottom
                 v-bind="attrs"
                 v-on="on">
            <v-icon class="mr-2"
                    size="30">
              mdi-plus
            </v-icon>
            Criar Evento
          </v-btn>
        </template>

        <criar-evento-dialog @fecharCriarEventoDialog="fecharCriarEventoDialog">
        </criar-evento-dialog>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import moment from 'moment'
import criarEventoDialog from '@/pages/eventos/components/criarEventoDialog.vue'
import apiEventos from '../../api/resources/evento.js'
import { mapGetters } from 'vuex';

export default {
  name: "pgEventosIndex",
  components: { criarEventoDialog },
  data() {
    return {
      criarEventoDialog: false,
      eventos: [],
      

    }
  },

  computed: {
    ...mapGetters(['isAdmin']), // Mapeia o estado de isAdmin do Vuex
    userName() {
      // Obtenha o nome do usuário a partir da autenticação, por exemplo
      return 'Nome do Usuário'; // Substitua pelo nome real do usuário
    },
  },
  
  created() {
    apiEventos.listarEventos().then((response) => {
      this.eventos = response
    })
  },
  methods: {
    formatarData(timestamp) {
      // Utilize o moment para formatar a data
      return moment(timestamp).format('DD MMM').toUpperCase();
    },
    carregarEventos() {
      this.eventos = apiEventos.listarEventos()
    },
    redirecionarEvento(eventoId) {
      this.$router.push({ name: 'evento', params: { eventoId: eventoId } })
    },
    fecharCriarEventoDialog() {
      this.criarEventoDialog = false
    },


  }
}
</script>



<style>
@media (max-width: 425px){
  .mt-4 {
    width: 280px;
    height: 250px;
    padding: 2.5rem;
  }
}

@media (max-width: 375px){
  .mt-4 {
    width: 280px;
    height: 250px;
    padding: 2.5rem;
  }
}
@media (max-width: 320px){
  .mt-4 {
    width: 280px;
    height: 250px;
    padding: 2.5rem;
  }
}
</style>