<template>
  <div id="pgAtividadeDialog">
    <v-card class="mx-auto my-2" width="700px" outlined>
      <v-card-title class="py-2 justify-center" style="color: #097FA8">
        {{ nome }}
      </v-card-title>
      <v-divider class="mx-6"></v-divider>
      <v-card-subtitle class="py-2 justify-center text-justify" style="color: #8B8B8B">
        {{ descricao }}
      </v-card-subtitle>
      <v-card-subtitle class="py-2 text-justify" style="color: #8B8B8B">
        <span class="font-weight-bold">Modalidade:</span>
        {{ getModalidadeText(id_modalidade) }}
      </v-card-subtitle>
      <v-card-subtitle class="py-2 text-justify" style="color: #8B8B8B">
        <span class="font-weight-bold">Local:</span>
        {{ local }}
      </v-card-subtitle>
      <v-card-subtitle class="py-2 text-justify" style="color: #8B8B8B">
        <span class="font-weight-bold">Data:</span>
        {{ formatarData(horaInicio) }}
      </v-card-subtitle>
      <v-row class="py-2 mb-1">
        <v-col class="pa-0">
          <v-card-subtitle class="py-2 text-justify" style="color: #8B8B8B">
            <span class="ml-3 font-weight-bold">Horário:</span>
            {{ formatarHora(horaInicio) }} - {{ formatarHora(horaFim) }}
          </v-card-subtitle>
        </v-col>
      </v-row>
      <v-dialog v-model="inscricaoDialog" width="700">
        <template v-slot:activator="{ on, attrs }">
          <v-row class="d-flex justify-center my-3">
          <v-btn
            class="pa-0 ml-3 mr-8 mx-auto d-block"
            style="color: white"
            color="#097FA8"
            height="30"
            width="130"
            v-bind="attrs"
            v-on="on"
            depressed
          >
            Inscrever-se
          </v-btn>
        </v-row>
        </template>
        <inscricaoDialog :dialog="inscricaoDialog" :atividade="atividade" @fecharInscricaoDialog="fecharInscricaoDialog"></inscricaoDialog>
      </v-dialog>
    </v-card>
  </div>
</template>


<script >
import inscricaoDialog
 from './inscricaoDialog.vue';
export default {
  name: "atividadeDialog",
  components: {inscricaoDialog},
  data(){
    return{
      inscricaoDialog: false
    }
  },
  methods: {
    fecharAtividadeDialog() {
      console.log(this.id)
      this.$emit('fecharAtividadeDialog', this.id)
      
    },
    getModalidadeText(id) {
      return id === 1 ? 'Presencial' : (id === 2 ? 'Remoto' : '');
    },
    formatarHora(hora) {
      const data = new Date(hora);
      const horaFormatada = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      return horaFormatada;
    },
    formatarData(data) {
      const dataFormatada = new Date(data).toLocaleDateString('pt-BR');
      return dataFormatada;
    },
    fecharInscricaoDialog() {
      this.inscricaoDialog = false; // Feche o diálogo de inscrição
    },
  },
  props: {
    id: {
      required: true
    },
    nome: {
      required: true
    },
    descricao: {
      required: true
    },
    id_modalidade : {
      required: true
    },
    quantidade_vagas:{
      required:true
    },
    local: {
      required: true
    },
    data: {
      required: true
    },
    horaInicio: {
      required: true
    },
    horaFim: {
      required: true
    },
    atividade: {
      required: true
    }
  }
}
</script>

<style scoped>

</style>