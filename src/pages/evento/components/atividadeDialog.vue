<template>
  <div id="pgAtividadeDialog">
    <v-card class="mx-auto my-2"
            width="700px"
            outlined>
      <v-card-title class="py-2 justify-center"
                    style="color: #097FA8">
        {{ nome }}
      </v-card-title>
      <v-divider class="mx-6"></v-divider>
      <v-card-subtitle class="py-2 justify-center text-justify"
                       style="color: #8B8B8B">
        {{ descricao }}
      </v-card-subtitle>
      <v-card-subtitle class="py-2 text-justify"
                       style="color: #8B8B8B">
        <span class="font-weight-bold">
          Modalidade:
        </span>
        {{ getModalidadeText(id_modalidade) }}
      </v-card-subtitle>
      <v-card-subtitle class="py-2 text-justify"
                       style="color: #8B8B8B">
        <span class="font-weight-bold">
          Local:
        </span>

        {{ local }}
      </v-card-subtitle>
      <v-card-subtitle class="py-2 text-justify"
                       style="color: #8B8B8B">
        <span class="font-weight-bold">
          numeroParticipantes:
        </span>

        {{ numeroParticipantes }}
      </v-card-subtitle>
      
      <v-card-subtitle class="py-2 text-justify"
                       style="color: #8B8B8B">
            <span class="font-weight-bold">
              Data:
            </span>
        {{ data }}
      </v-card-subtitle>
      <v-row class="py-2 mb-1">
        <v-col class="pa-0">
          <v-card-subtitle class="py-2 text-justify"
                           style="color: #8B8B8B">
            <span class="ml-3 font-weight-bold">
              Horário:
            </span>
            {{ horaInicio }} - {{ horaFim }}
          </v-card-subtitle>
        </v-col>

        <v-col class="pa-0 d-flex justify-end">
          <v-btn class="pa-0 ml-3 mr-8"
                 height="30"
                 width="130"
                 outlined
                 @click="fecharAtividadeDialog">
            Fechar
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
</div>
</template>

<script >
export default {
  name: "atividadeDialog",
  methods: {
    fecharAtividadeDialog() {
      this.$emit('fecharAtividadeDialog', this.atividade.id)
    },
    getModalidadeText(id) {
      return id === 1 ? 'Presencial' : (id === 2 ? 'Remoto' : '');
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
    numeroParticipantes:{
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
    }
  }
}
</script>

<style scoped>

</style>