<template>
  <div id="pgCriarEventoDialog">
    <v-card class="pa-10"
            width="1000">
      <v-row justify="center"
             class="text-h2 font-weight-bold"
             style="color: #097FA8">
        Crie seu evento
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
              <data-picker label="Data de Início"
                           campo="dataInicio"
                           @dataSelecionada="selecaoData">
              </data-picker>
            </v-col>
            <v-col>
              <data-picker label="Data de Fim"
                           campo="dataFim"
                           @dataSelecionada="selecaoData">
              </data-picker>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <time-picker label="Hora de Início"
                           campo="horaInicio"
                           @horaSelecionada="selecaoHora">
              </time-picker>
            </v-col>
            <v-col>
              <time-picker label="Hora de Fim"
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
                        prepend-icon="mdi-camera"
                        accept="image/png"
                        placeholder="Selecione a imagem banner do evento"
                        :rules="regrasImagem"
                        outlined>
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
import axios from 'axios'
import apiTipo from '../../../api/resources/tipo.js'
import apiCategoria from '../../../api/resources/categoria.js'

import dataPicker from '@/pages/eventos/components/dataPicker.vue'
import timePicker from '@/pages/eventos/components/timePicker.vue'
export default {
  name: "pgCriarEventoDialogIndex",
  components: { dataPicker, timePicker },
  data() {
    return {
      evento: {
        nome: null,
        descricao: null,
        tipo: null,
        local: null,
        dataInicio: null,
        horaInicio: null,
        horario_inicio : null,
        horario_encerramento : null,
        dataFim: null,
        horaFim: null,
        categoria: null,
        imagem: null,
        created_by_user: 1,
      },
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
    adicionarEvento() {
      const formData = new FormData();

      this.evento.horario_inicio = `${this.evento.dataInicio} ${this.evento.horaInicio}`;
      this.evento.horario_encerramento = `${this.evento.dataFim} ${this.evento.horaFim}`;

      formData.append('nome', this.evento.nome);
      formData.append('descricao', this.evento.descricao);
      formData.append('categoria', this.evento.categoria);
      formData.append('local', this.evento.local);
      formData.append('created_at', new Date().toISOString());
      formData.append('data_inicial', this.evento.horario_inicio);
      formData.append('situacao', 'Em Aprovação');
      formData.append('data_final', this.evento.horario_encerramento);
      formData.append('tipo', this.evento.tipo);

      formData.append('created_by_user', 1);
      
      axios.post('http://127.0.0.1/eventos/', formData)
      .then((response)=>{        
        console.log(response.data)
      })
      .catch(error =>{
        console.log(error)
      })
    }
  }
}
</script>

<style>

</style>