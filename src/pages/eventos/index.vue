<template>
  <div id="pgEventos">
    <v-row class="mt-4">
      <v-card v-for="evento in eventos"
              :key="evento.id"
              class="mx-auto my-2 mr-2 ml-2"
              id="posicaoBaseEventoCard"
              width="280"
              height="250px"
              hover
              outlined
              @click="redirecionarEvento(evento.id)">
        <v-img :src="evento.imagem"
               height="140px">
        </v-img>
        <v-card-title>
          {{ evento.nome }}
        </v-card-title>
        <v-card-subtitle class="py-0 font-weight-bold"
                         style="color: #AEAEAE">
          {{ evento.dataInicio }}
        </v-card-subtitle>
        <v-card-subtitle class="py-0 font-weight-bold"
                         style="color: #AEAEAE">
          {{ evento.local }}
        </v-card-subtitle>
      </v-card>


      <v-dialog 
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
import axios from 'axios'

export default {
  name: "pgEventosIndex",
  components: { criarEventoDialog },
  data() {
    return {
      criarEventoDialog: false,
      eventos: [
        { id: 1, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        { id: 2, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        { id: 3, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        { id: 4, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        { id: 5, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        { id: 6, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        { id: 7, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        { id: 8, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        { id: 9, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'},
        { id: 10, nome: 'Congresso Acadêmico', dataInicio: '18/04/2023', local: 'FACOM - UFMS', imagem: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'}
      ]
    }
  },
  created() {
    this.carregarEventos()
  },
  methods: {
    carregarEventos() {
      axios.get('http://127.0.0.1/eventos/')
        .then(response => {
          this.eventos = response.data.map(evento => ({
            id : evento.id,
            nome: evento.nome,
            descricao: evento.descricao,
            local: evento.local,
            dataInicio: evento.data_inicial,
            imagem: evento.imagem || 'https://img2.gratispng.com/20180510/sxq/kisspng-boulder-theater-computer-icons-ticket-cinema-5af509b9cdcea8.635574511526008249843.jpg'            
          }));
        })
        .catch(error => {
          console.error(error);
        });
    },
    redirecionarEvento(eventoId) {
      this.$router.push({ name: 'evento', params: { eventoId: eventoId } })
    },
    fecharCriarEventoDialog() {
      this.criarEventoDialog = false
    }
  }
}
</script>



<style>

</style>