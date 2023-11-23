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
          <label class="label-style" for="descricao">Descrição</label>
          <v-textarea class="campo-style" id="descricao"
                            v-model="evento.descricao"
                            placeholder="Descrição sobre o evento"
                            outlined 
                            :rules="requiredRule('Descrição')"                                                      
          ></v-textarea>
        </v-col>
      </v-row>
          <v-row>
            <v-col>
            <label class="label-style" for="dataInicio">Data de Inicio</label>
            <v-text-field
                id="dataInicio"
                v-model="dataInicio"
                placeholder="Data (DD/MM/AAAA)"
                outlined
                v-mask="'##/##/####'"
                :rules="requiredRule('Data de Inicio')"
                @blur="validateData('dataInicio')"
              ></v-text-field>
            </v-col>
            <v-col>
              <label class="label-style" for="horaInicio">Hora de Inicio</label>
              <v-text-field
                id="horaInicio"
                v-model="horaInicio"
                placeholder="Hora Inicio"
                @horaSelecionada="selecaoHora"
                :rules="requiredRule('Hora de Inicio')"
                v-mask="'##:##'"
                outlined
                @blur="validateHora('horaInicio')"
            ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label class="label-style" for="dataFim">Data de Fim</label>
              <v-text-field
                id="dataFim"
                v-model="dataFim"
                placeholder="Data (DD/MM/AAAA)"
                outlined
                v-mask="'##/##/####'"
                :rules="requiredRule('Data de Fim')"
                @blur="validateData('dataFim')"
              ></v-text-field>
            </v-col>
            <v-col>
              <label class="label-style" for="horaFim">Hora de Fim</label>
              <v-text-field
                id="horaFim"
                v-model="horaFinal"
                placeholder="Hora Final"
                :rules="requiredRule('Hora de Fim')"
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
import middleware from '../../../middleware/localStorage.js'
//import timePicker from '@/pages/eventos/components/timePicker.vue'
export default {
  name: "pgCriarEventoDialogIndex",
  data() {
    return {
      evento: {
        nome: null,
        descricao: null,
        local: null,
        horario_inicio : null,
        horario_encerramento : null,
        base64Image: null,
        created_by_user: 1,
      },
      
      selectedImage: null,

      horaInicio: '',
      horaFinal: '',

      dataInicio: '',
      dataFim: '',
      descriptionCharacterLimit: 255,
      regrasImagem: [
        value => !value || value.size < 5000000 || 'Máximo de 5Mb em PNG',
      ]
    }
  },
  created() {
    Vue.directive("mask", VueMaskDirective);
  },
  methods: {
   
    validateData(field) {
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      console.log(this[field])
      if (dateRegex.test(this[field])) {
        const parts = this[field].split('/');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Os meses em JavaScript começam em 0 (janeiro é 0)
        const year = parseInt(parts[2], 10);
        const currentDate = new Date();
        const inputDate = new Date(year, month, day);
  
        if (inputDate < currentDate) {
          this[field] = ''; // Limpa o campo se a data for inválida
        }
    } else {
        this[field] = ''; // Limpa o campo se a data estiver em um formato inválido
    }
  },
    validateHora(field) {
       const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

      if (timeRegex.test(this[field])) {
        //const formattedTime = `${this.getCurrentDate()} ${this.evento[field]}:00`;
        return this[field]
      } else {
        // Clear the input if the format is not valid when losing focus
        this[field] = '';
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
    // selecaoData(campo, valor) {
    //   if (campo == 'dataInicio') {
    //     this.dataInicio = valor
    //   } else if (campo == 'dataFim') {
    //     this.dataFim = valor
    //   }
    // },
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

      this.evento.horario_inicio = `${this.dataInicio} ${this.horaInicio}`;
      this.evento.horario_encerramento = `${this.dataFim} ${this.horaFinal}`;

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
        location.reload()
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