<template>
  <div id="pgEventos">
    <v-row class="mt-4">
      <v-card v-for="evento in eventos"
              :key="evento.id"
              class="mx-auto my-3 mr-3 ml-3"
              id="posicaoBaseEventoCard"
              width="280px"
              height="250px"
              padding="2.5rem"
              hover
              @click="redirecionarEvento(evento.id)">
        <v-img :src="evento.imagem"
               height="130px">
        </v-img>
        <v-card-subtitle class="py-0 font-weight-bold"
                         style="color: #0088B7">
          {{ evento.dataInicio }} > {{ evento.dataFim }}
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


      <v-dialog v-if="this.$store.getters.isEditor"
                v-model="criarEventoDialog"
                width="1000">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary"
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
    <vue-pagination-2 v-if="totalPaginas > 1"
                      :current.sync="paginaAtual"
                      :total="totalPaginas"
                      :per-page="itensPorPagina"
                      @on-change="paginaMudou">
    </vue-pagination-2>  
  </div>
</template>
<script>
import criarEventoDialog from '@/pages/eventos/components/criarEventoDialog.vue'
import apiEventos from '../../api/resources/evento.js'

export default {
  name: "pgEventosIndex",
  components: { criarEventoDialog },
  data() {
    return {
      criarEventoDialog: false,
      eventos: [
        // { id: 1, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 2, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 3, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 4, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 5, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 6, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 7, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 8, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 9, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 10, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 1, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 2, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 3, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 4, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 5, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 6, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 7, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 8, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 9, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 10, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 1, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 2, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 3, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 4, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 5, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 6, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 7, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 8, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 9, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        // { id: 10, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', dataFim: '20/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
    
      ],
      itensPorPagina: 5,
      paginaAtual: 1

    }
  },

  computed: {
    totalPaginas() {
      return Math.ceil(this.eventos.length / this.itensPorPagina)
    },
    eventosDaPagina() {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina
      const fim = inicio + this.itensPorPagina
      return this.eventos.slice(inicio, fim)
    }
  },
  created() {
    this.carregarEventos()
  },
  methods: {
    carregarEventos() {
      this.eventos = apiEventos.listarEventos()
    },
    redirecionarEvento(eventoId) {
      this.$router.push({ name: 'evento', params: { eventoId: eventoId } })
    },
    fecharCriarEventoDialog() {
      this.criarEventoDialog = false
    },
    paginaMudou(novaPagina) {
      this.paginaAtual = novaPagina
    }


  }
}
</script>



<style>

</style>