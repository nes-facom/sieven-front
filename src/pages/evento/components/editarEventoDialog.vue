<template>
<div id="pgEditarEventoDialog">
    <v-card class="pa-10"
            width="1000">
      <v-row justify="center"
             class="text-h2 font-weight-bold"
             style="color: #097FA8">
        Editar Evento
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
        horario_inicio : null,
        horario_encerramento : null,
        dataFim: null,
        horaFim: null,
        categoria: null,
        base64Image: null,
        created_by_user: 1,
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

      const evento = 
      {
        nome: this.evento.nome,
        descricao: this.evento.descricao,
        id_categoria: this.selectedCategoria,
        id_tipo: this.selectedTipo,
        local: this.evento.local,
        data_inicial: this.evento.dataInicio,
        data_final: this.evento.dataFim,
        horaInicio: this.evento.horaInicio,
        horaFim: this.evento.horaFim,
        imagem: this.evento.base64Image,
        situacao: "Em Aprovação",
        created_by_user: 1
      }
      console.log(evento)
      apiEvento.editarEventos(eventoId).then(response => {
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
      const dataInicial = new Date(eventoResponse.data_inicial);
      const horaInicial = dataInicial.toLocaleTimeString();
      const dataInicialFormatada = dataInicial.toLocaleDateString();

      const dataFinal = new Date(eventoResponse.data_final);
      const horaFinal = dataFinal.toLocaleTimeString();
      const dataFinalFormatada = dataFinal.toLocaleDateString();
  

      this.evento = {
        imagem: eventoResponse.imagem || 'https://img2.gratispng.com/20180510/sxq/kisspng-boulder-theater-computer-icons-ticket-cinema-5af509b9cdcea8.635574511526008249843.jpg',
        nome: eventoResponse.nome,
        descricao: eventoResponse.descricao,
        local: eventoResponse.local,
        dataInicio: dataInicialFormatada,
        horaInicio: horaInicial,
        dataFim: dataFinalFormatada,
        horaFim : horaFinal,
        tipo: eventoResponse.tipo,
        categoria: eventoResponse.categoria,
        created_at: new Date().toISOString(),
        dialog: false
      };

    })
      .catch(error => {
      console.log(eventoId, error);
    });
  }
}
</script>


<style>
</style>