<template>
  <div id="pgCriarEventoDialog">
    <v-card class="pa-10"
            width="700">
      <div class="text-h4 font-roboto" style="color: #097FA8">
        Editar Evento
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
              <v-text-field
                v-model="evento.dataInicio"
                placeholder="Data de Início (DD/MM/AAAA)"
                outlined
                @input="validateData('dataInicio')"
              ></v-text-field>
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
              <v-text-field
                v-model="evento.dataFim"
                placeholder="Data de Fim (DD/MM/AAAA)"
                outlined
                @blur="validateData('dataFim')"
            ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="evento.horaFim"
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
                 @click="fecharEditarEventoDialog()">
            Cancelar
          </v-btn>
          <v-btn style="color: white;"
                 color="#097FA8"
                 width="150"
                 @click="salvarEvento()">
            Editar Evento
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
  
<script>
  

import { VueMaskDirective } from "v-mask";
import Vue from 'vue'
import apiEvento from '../../../api/resources/evento.js'


  
export default{
  name:"pgEditarEventoIndex",
  data(){
    return{
      evento: {
        nome: null,
        descricao: null,
        local: null,
        dataInicio: null,
        horaInicio: null,
        horario_inicio: null,
        horario_encerramento:null,
        dataFim: null,
        horaFim: null,
        base64Image: null,
        eventId: null,
  
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
  
    carregarEventoData(eventId){
      apiEvento.visualizarEventos(eventId).
      then(response => {
        const eventoResponse = response
        const dataInicial = new Date(eventoResponse.data_inicial);
        const horaInicial = dataInicial.toLocaleTimeString();
        const dataInicialFormatada = dataInicial.toLocaleDateString();

        const dataFinal = new Date(eventoResponse.data_final);
        const horaFinal = dataFinal.toLocaleTimeString();
        const dataFinalFormatada = dataFinal.toLocaleDateString();

        this.evento = {
          nome: eventoResponse.nome,
          descricao: eventoResponse.descricao,
          local: eventoResponse.local,
          dataInicio: dataInicialFormatada,
          horaInicio: horaInicial,
          dataFim: dataFinalFormatada,
          horaFim: horaFinal,
          selectedImage: eventoResponse.base64Image
        }
        
        console.log(this.evento.dataInicio)
        console.log(this.evento.dataFim)
        console.log(this.evento.horaInicio)
        console.log(this.evento.horaFim)
      })
      .catch(error => {
        console.log(eventId, error)
      })    
    },
  
    fecharEditarEventoDialog() {
      this.$emit("fecharEditarEventoDialog")
    },
  
    validateData(field) {
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

      if (dateRegex.test(this.evento[field])) {
      const parts = this.evento[field].split('/');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Os meses em JavaScript começam em 0 (janeiro é 0)
      const year = parseInt(parts[2], 10);
      const currentDate = new Date();
      const inputDate = new Date(year, month, day);

      if (inputDate < currentDate) {
      this.evento[field] = ''; // Limpa o campo se a data for inválida
      }
    } else {
      this.evento[field] = ''; // Limpa o campo se a data estiver em um formato inválido
    }
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
  
    salvarEvento(){
      const eventoId = this.$route.params.id
        
      this.evento.horario_inicio = `${this.evento.dataInicio} ${this.evento.horaInicio}`;
      this.evento.horario_encerramento = `${this.evento.dataFim} ${this.evento.horaFim}`;
      const evento = 
      {
        nome: this.evento.nome,
        descricao: this.evento.descricao,
        local: this.evento.local,
        data_inicial: this.evento.horario_inicio,
        data_final: this.evento.horario_encerramento,
        imagem: this.evento.base64Image,
      }
      
      apiEvento.editarEventos(eventoId, evento).then(response => {
        console.log(response)
        location.reload()
          
      })
      .catch((error) => {
        console.error(error)
      })
      this.$emit('fecharEditarEventoDialog');
    }
  },
  
    mounted(){
      this.eventId = this.$route.params.id
      if(this.eventId){
        this.carregarEventoData(this.eventId)
      }
    }
  }
  </script>
  
  <style>

  </style>