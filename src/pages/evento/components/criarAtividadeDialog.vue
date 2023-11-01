<script src="../../../store/index.js"></script>
<template>
  <div id="criarAtividadeDialog">
    <v-card class="pa-10"
            width="700">
      <v-row class="text-h4 font-roboto" style="color: #097FA8">
        Criar Atividade
      </v-row>

      <v-row class="mt-4">
        <v-col cols="12">
          <label class="label-style" for="nome">Nome</label>
          <v-text-field class="campo-style"
                        id="nome"
                        v-model="atividade.nome"
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
                            v-model="atividade.descricao"
                            placeholder="Descrição sobre a atividade" 
                            auto-grow 
                            :rules="requiredRule('Descrição')"
                            outlined>
          </v-textarea>
          <span class="char-count">
            ({{ atividade.descricao ? 255 - atividade.descricao.length : 255 }} caracteres restantes)
          </span>
        </v-col>
      </v-row>
      <v-row>  
        <v-col cols="12">
          <label class="label-style" for="capacidade">Capacidade</label>
          <v-text-field class="mb-0 pa-0"
                        id="numeroParticipantes"
                        label="Capacidade"
                        type="number"
                        v-model="atividade.quantidade_vagas"
                        placeholder="Numero de Participantes"
                        :rules="requiredRule('Capacidade')"
                        outlined>
          </v-text-field>
        </v-col>
      </v-row> 

          <div class="mt-0"
               style="color: grey">
            Modalidade
          </div>
          <v-radio-group class="mt-0" v-model="atividade.id_modalidade" row @change="handleRadioChange">
            <v-radio value="presencial">
              <template v-slot:label>
                <div>Presencial</div>
              </template>
            </v-radio>
            <v-radio value="remoto">
              <template v-slot:label>
                <div>Remoto</div>
              </template>
            </v-radio>
          </v-radio-group>
          <v-row>
            <v-col >
              <data-picker v-model="data"
                           label="Data"
                           campo="dataInicio"
                           @dataSelecionada="selecaoData">
              </data-picker>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="horaInicio"
                placeholder="Hora Inicio"
                @horaSelecionada="selecaoHora"
                v-mask="'##:##'"
                outlined
                @blur="validateHora('horaInicio')"
            ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="horaFim"
                placeholder="Hora Final"
                @horaSelecionada="selecaoHora"
                v-mask="'##:##'"
                outlined
                @blur="validateHora('horaFim')"
            ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
            <label class="label-style" for="local">Local</label>
            <v-text-field class="campo-style" 
                          id="local"
                          v-model="atividade.local"
                          :rules="requiredRule('Local')"
                          placeholder="Local do Evento"
                          outlined>
            </v-text-field>
            </v-col>
          </v-row>
        <v-row>  
        <v-col cols="12">
          <label class="label-style" for="cateogria">Categoria</label>
          <v-select
                v-model="selectedCategoria"
                :items="categorias"
                item-value="id" 
                item-text="nome_categoria"
                label="Categoria"
                :rules="requiredRule('Categoria')"
                outlined
          ></v-select> 
        </v-col> 
        </v-row> 
        <v-row>
          <v-col cols="12">
          <label class="label-style" for="tipo">Tipo</label>    
              <v-select
                  v-model="selectedTipo"
                  :items="tipos"
                  item-value="id" 
                  item-text="nome_tipo"
                  label="Tipo"
                  :rules="requiredRule('Tipo')"
                  outlined
              ></v-select>
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
                 @click="cancelarAtividade">
            Cancelar
          </v-btn>
          <v-btn style="color: white;"
                 color="#097FA8"
                 width="150"
                 @click="adicionarEvento">
            {{ this.mensagemConfirmacao() }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>

import apiAtividade from '../../../api/resources/atividade.js'
import dataPicker from '@/pages/eventos/components/dataPicker.vue'
import timePicker from '@/pages/eventos/components/timePicker.vue'
import apiTipo from '../../../api/resources/tipo.js'
import apiCategoria from '../../../api/resources/categoria.js'
import middleware from '../../../middleware/localStorage.js'

export default {
  name: "pgCriarAtividadeDialogIndex",
  components: { dataPicker, timePicker },
  data() {
    return {
      atividade: {
        evento_id: '',
        nome: '',
        descricao: '',
        local: '',
        id_categoria: '',
        id_tipo: '',
        horario_inicio: '',
        horario_encerramento: '',
        quantidade_vagas: '',
        id_modalidade: 1
      },
      
      data: '',
      horaFim: '',
      horaInicio: '',
      palestrante: '',
      requisitos: '',

      tipos: [],
      selectedTipo: null,

      categorias: [],
      selectedCategoria: null,

      requisitoTexto: null
    }
  },
  created() {
    this.carregaTipos()
    this.carregaCategorias()
  },
  methods: {
    handleRadioChange() {
      // Ao selecionar "Presencial", atribua 1 a id_modalidade
      // Ao selecionar "Remoto", atribua 3 a id_modalidade
      if (this.atividade.id_modalidade === 'presencial') {
        this.atividade.id_modalidade = 1;
      } else if (this.atividade.id_modalidade === 'remoto') {
        this.atividade.id_modalidade = 3;
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
    
    mensagemConfirmacao() {
      if (this.editar) {
        return "Editar Atividade"
      } else {
        return "Criar Atividade"
      }
    },
    requiredRule(fieldName) {
      return [(v) => !!v || `${fieldName} é obrigatório.`];
    },
    selecaoData(campo, valor) {
      if (campo == 'dataInicio') {
        this.dataInicio = valor
      } else if (campo == 'dataFim') {
        this.dataFim = valor
      }
    },
    selecaoHora(campo, valor) {
      if (campo == 'horaInicio') {
        this.horaInicio = valor
      } else if (campo == 'horaFim') {
        this.horaFim = valor
      }
    },
    adicionarRequisito() {
      if (this.requisitoTexto.length > 0) {
        this.requisitos.push(this.requisitoTexto)
        this.requisitoTexto = null
      }
    },
    cancelarAtividade() {
      if (this.editar){
        this.$emit('cancelarEditarAtividade', this.id)
      } else {
        this.$emit('cancelarAtividade')
      }
    },
    adicionarAtividade() {
      if (this.atividade.descricao.length > 250) {
        alert('A descrição não pode ter mais de 250 caracteres.');
      } else {
        this.$emit('adicionarAtividade', this.atividade);
  }
    },
    adicionarEvento() {
      this.atividade.horario_inicio = `${this.dataInicio} ${this.horaInicio}`;
      this.atividade.horario_encerramento = `${this.dataInicio} ${this.horaFim}`;

      //const formData = new FormData();

      const atividade = {
        evento_id: this.$route.params.id,
        nome: this.atividade.nome,
        descricao: this.atividade.descricao,
        local: this.atividade.local,
        id_categoria: this.selectedCategoria,
        id_tipo: this.selectedTipo,
        horario_inicio: this.atividade.horario_inicio,
        horario_encerramento: this.atividade.horario_encerramento,
        quantidade_vagas: this.atividade.quantidade_vagas,
        id_modalidade: this.atividade.id_modalidade
      }

      apiAtividade.cadastrarAtividade(middleware.recuperarToken('token').access_token, atividade)
          .then( (response) => {
             location.reload()
          })
          .catch(error => {
            console.error(error);
          });
    },
    limitarDescricao() {
    if (this.atividade.descricao && this.atividade.descricao.length > 255) {
      this.atividade.descricao = this.atividade.descricao.slice(0, 255);
      }
    },
  },
  props: {
    editar: {
      required: false
    },
    id: {
      required: false
    }
  }
}
</script>

<style>

</style>