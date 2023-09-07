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
          {{ evento.data_inicial }} > {{ evento.data_final }}
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
      eventos: [],
      

    }
  },  
  created() {
    //this.carregarEventos()
    apiEventos.listarEventos().then((response) => {
      this.eventos = response
      //console.log(this.eventos);
    })
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


  }
}
</script>



<style>

</style>