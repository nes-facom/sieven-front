<template>
  <div id="pgEditarEventoDialog">
      <v-card class="pa-10"
              width="1000">
        <v-row justify="center"
               class="text-h2 font-weight-bold"
               style="color: #097FA8">
          Editar
        </v-row>
  
        <v-row class="mt-10">
          <v-col>
            <v-text-field label="Nome"
                          v-model="evento.nome"
                          outlined>
            </v-text-field>
            <v-text-field label="Local"
                          v-model="evento.local"
                          outlined>
            </v-text-field>
            <v-row>
              <v-col>
                <data-picker
                   ref="datePickerInicio"
                  label="Data de Início"
                  campo="dataInicio"
                  @dataSelecionada="selecaoData"
                ></data-picker>
              </v-col>
              <v-col>
                <data-picker ref="datePickerFim"
                              label="Data de Fim"
                             campo="dataFim"
                             @dataSelecionada="selecaoData">
                </data-picker>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <time-picker ref="timePickerInicio"
                            label="Hora de Início"
                             campo="horaInicio"
                             @horaSelecionada="selecaoHora">
                </time-picker>
              </v-col>
              <v-col>
                <time-picker ref="timePickerFim"
                            label="Hora de Fim"
                             campo="horaFim"
                             @horaSelecionada="selecaoHora">
                </time-picker>
              </v-col>
            </v-row>
          </v-col>
  
          <v-divider class="mx-4"
                     vertical>
          </v-divider>
  
          <v-col cols="6">
            <v-textarea label="Descrição"
                        v-model="evento.descricao"
                        auto-grow
                        outlined>
            </v-textarea> 
            <v-select
                v-model="selectedCategoria"
                :items="categorias"
                item-value="id" 
                item-text="nome_categoria"
                label="Categoria"
                outlined
            ></v-select> 
            <v-select
                v-model="selectedTipo"
                :items="tipos"
                item-value="id" 
                item-text="nome_tipo"
                label="Tipo"
                outlined
            ></v-select> 
            <v-file-input label="Imagem"
                          v-model="selectedImage"
                          prepend-icon="mdi-camera"
                          accept="image/png"
                          placeholder="Selecione a imagem banner do evento"
                          :rules="regrasImagem"
                          outlined
                          @change="handleImageUpload">
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
              Salvar evento
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </div>
</template>
  
<script>
  
import moment from 'moment';
import apiTipo from '../../../api/resources/tipo.js'
import apiCategoria from '../../../api/resources/categoria.js'
import apiEvento from '../../../api/resources/evento.js'
import dataPicker from '@/pages/eventos/components/dataPicker.vue';
import timePicker from '@/pages/eventos/components/timePicker.vue';
  
export default{
  name:"pgEditarEventoIndex",
  components: { dataPicker, timePicker },
  data(){
    return{
      evento: {
        nome: null,
        descricao: null,
        tipo: null,
        local: null,
        dataInicio: null,
        horaInicio: null,
        dataFim: null,
        horaFim: null,
        categoria: null,
        base64Image: null,
  
      },
      selectedImage: null,
      tipos: [],
      selectedTipo: null,
  
      categorias: [],
      selectedCategoria: null,
  
      regrasImagem: [
          value => !value || value.size < 5000000 || 'Máximo de 5Mb em PNG',
      ]
    }
  },
  
  created() {
    this.carregaTipos()
    this.carregaCategorias()
  },
  
  methods: {
    carregaTipos() {
      apiTipo.listarTipos().then(
        (respostaTipo) => {
          this.tipos = respostaTipo
        }
      )
    },
    carregaCategorias(){
      apiCategoria.listarCategorias().then(
        (respostaCategoria) => {
          this.categorias = respostaCategoria
        }
      )
    },
  
    fecharEditarEventoDialog() {
      this.$emit("fecharEditarEventoDialog")
    },
  
    selecaoData(campo, valor) {
      if (campo == 'dataInicio') {
        this.evento.dataInicio = valor
      } else if (campo == 'dataFim') {
        this.evento.dataFim = valor
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
      const eventoId = this.$route.params.eventoId
        
      this.evento.horario_inicio = `${this.evento.dataInicio} ${this.evento.horaInicio}`;
      this.evento.horario_encerramento = `${this.evento.dataFim} ${this.evento.horaFim}`;
      const evento = 
      {
        nome: this.evento.nome,
        descricao: this.evento.descricao,
        local: this.evento.local,
        data_inicial: this.evento.dataInicio,
        horaInicio: this.evento.horaInicio,
        data_final: this.evento.dataFim,
        horaFim : this.evento.horaFim,
        id_tipo: this.evento.selectedTipo,
        id_categoria: this.evento.selectedCategoria,
        imagem: this.evento.base64Image,
      }
      console.log(evento)
      apiEvento.editarEventos(eventoId, evento).then(response => {
        console.log(response)
          
      })
      .catch((error) => {
        console.error(error)
      })
      this.$emit('fecharEditarEventoDialog');
    }
  },
  
    mounted(){
      const eventoId = this.$route.params.eventoId
      apiEvento.visualizarEventos(eventoId)
      .then(response => {
        const eventoResponse = response
  
  
        this.evento = {
          nome: eventoResponse.nome,
          descricao: eventoResponse.descricao,
          selectedTipo: eventoResponse.tipo,
          local: eventoResponse.local,
          dataInicio: eventoResponse.data_inicial,
          horaInicio: eventoResponse.horaInicio,
          dataFim: eventoResponse.data_final,
          horaFim: eventoResponse.horaFim,
          selectedCategoria: eventoResponse.categoria,
          selectedImage: eventoResponse.base64Image
        };
        const dataInicioFormatted = moment(this.evento.dataInicio).format('YYYY-MM-DD')
        const dataFimFormatted = moment(this.evento.dataFim).format('YYYY-MM-DD')
        this.evento.dataInicio = dataInicioFormatted
        this.evento.dataFim = dataFimFormatted
  
        
  
      })
        .catch(error => {
        console.log(eventoId, error);
      });
    }
  }
  </script>
  
  <style>

  </style>