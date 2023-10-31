<template>
  <div id="pgCriarEventoDialog">
    <v-card class="pa-10"
            width="700">
      <div class="text-h4 font-roboto" style="color: #097FA8">
        Criar Evento
      </div>

      <v-row class="mt-4">
        <v-col cols="12">
          <label class="label-style" for="nome">Nome</label>
          <v-text-field class="campo-style"
                        id="nome"
                        v-model="evento.nome"
                        placeholder="Titulo do evento"
                        :rules="requiredRule('Nome')"
                        outlined>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <label class="label-style" for="desricao">Descrição</label>
          <v-textarea class="campo-style" id="descricao"
                            v-model="evento.descricao"
                            placeholder="Descrição sobre o evento" 
                            auto-grow 
                            :rules="requiredRule('Descrição')"
                            outlined>
          </v-textarea>
        </v-col>
      </v-row>
          <v-row>
            <v-col>
              <data-picker label="Data de Início"
                           campo="dataInicio"
                           @dataSelecionada="selecaoData">
              </data-picker>
            </v-col>
            <v-col>
              <v-text-field
                v-model="evento.horaInicio"
                placeholder="Hora Inicio"
                @horaSelecionada="selecaoHora"
                v-mask="'##:##'"
                outlined
                @blur="validateHora('horaInicio')"
            ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <data-picker label="Data de Fim"
                           campo="dataFim"
                           @dataSelecionada="selecaoData">
              </data-picker>
            </v-col>
            <v-col>
              <v-text-field
                v-model="evento.horaFinal"
                placeholder="Hora Final"
                @horaSelecionada="selecaoHora"
                v-mask="'##:##'"
                outlined
                @blur="validateHora('horaFinal')"
            ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
            <label class="label-style" for="local">Local</label>
            <v-text-field class="campo-style" 
                          id="local"
                          v-model="evento.local"
                          :rules="requiredRule('Local')"
                          placeholder="Local do Evento"
                          outlined>
            </v-text-field>
            </v-col>
          </v-row>

        <v-row>
          <v-col cols="12" class="text-left">
          <v-file-input label="Imagem"
                        v-model="selectedImage"
                        accept="image/png"
                        prepend-icon="mdi-camera"
                        placeholder="Selecione a imagem banner do evento"
                        :rules="regrasImagem"
                        outlined
                        @change="handleImageUpload"
                        hide-details>
          </v-file-input>
          </v-col>
        </v-row>
      <v-row>
        <v-col>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn class="mr-4"
                 color="black"
                 width="150"
                 outlined
                 @click="fecharCriarEventoDialog()">
            Cancelar
          </v-btn>
          <v-btn style="color: white;"
                 color="#097FA8"
                 width="150"
                 @click="adicionarEvento()">
            Criar Evento
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import apiEvento from '../../../api/resources/evento.js'
import { VueMaskDirective } from "v-mask";
import Vue from 'vue'
import dataPicker from '@/pages/eventos/components/dataPicker.vue'
import middleware from '../../../middleware/localStorage.js'
//import timePicker from '@/pages/eventos/components/timePicker.vue'
export default {
  name: "pgCriarEventoDialogIndex",
  components: { dataPicker },
  data() {
    return {
      evento: {
        nome: null,
        descricao: null,
        local: null,
        dataInicio: null,
        dataFim: null,
        horario_inicio : null,
        horario_encerramento : null,
        horaInicio: null,
        horaFinal: null,
        base64Image: null,
        created_by_user: 1,
      },
      selectedImage: null,

      regrasImagem: [
        value => !value || value.size < 5000000 || 'Máximo de 5Mb em PNG',
      ]
    }
  },
  created() {
    Vue.directive("mask", VueMaskDirective);
  },
  methods: {
    validateHora(field) {
      const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

      if (timeRegex.test(this.evento[field])) {
        //const formattedTime = `${this.getCurrentDate()} ${this.evento[field]}:00`;
        return this.evento[field]
      } else {
        // Clear the input if the format is not valid when losing focus
        this.evento[field] = '';
      }
    },
    getCurrentDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    },
    requiredRule(fieldName) {
      return [(v) => !!v || `${fieldName} é obrigatório.`];
    },

    fecharCriarEventoDialog() {
      this.$emit("fecharCriarEventoDialog")
    },
    selecaoData(campo, valor) {
      if (campo == 'dataInicio') {
        this.evento.dataInicio = valor
      } else if (campo == 'dataFim') {
        this.evento.dataFim = valor
      }
    },
    getEventos() {
      
    },
    selecaoHora(campo, valor) {
      if (campo == 'horaInicio') {
        this.evento.horaInicio = valor
      } else if (campo == 'horaFim') {
        this.evento.horaFim = valor
      }
    },

    async handleImageUpload() {
    if (this.selectedImage) {
      const file = this.selectedImage;

      const reader = new FileReader();

      reader.onload = (e) => {
        this.evento.base64Image = e.target.result;
      };

      reader.readAsDataURL(file);
    }
    },

    adicionarEvento() {

      this.evento.horario_inicio = `${this.evento.dataInicio} ${this.evento.horaInicio}`;
      this.evento.horario_encerramento = `${this.evento.dataFim} ${this.evento.horaFinal}`;

      const evento = 
      {
        nome: this.evento.nome,
        descricao: this.evento.descricao,
        local: this.evento.local,
        data_inicial: this.evento.horario_inicio,
        data_final: this.evento.horario_encerramento,
        imagem: this.evento.base64Image,
        situacao: "Em Aprovação",
        created_by_user: 1
      }
      console.log(evento)

      apiEvento.cadastrarEvento(middleware.recuperarToken('token').access_token, evento).then( () => {
        console.log(evento)
      })
      this.$emit("fecharCriarEventoDialog")
    }
  }
}
</script>

<style>
.label-style {
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #888; 
}


.campo-style {
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  color: black; 
}

.v-file-input .v-icon--link {
  display: none ;
}
</style>