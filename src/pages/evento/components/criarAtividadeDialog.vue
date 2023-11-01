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
                        v-model="atividade.numeroParticipantes"
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
          <v-radio-group class="mt-0"
                         v-model="atividade.modalidade"
                         row>
            <v-radio value="presencial">
              <template v-slot:label>
                <div>
                  Presencial
                </div>
              </template>
            </v-radio>
            <v-radio value="remoto">
              <template v-slot:label>
                <div>
                  Remoto
                </div>
              </template>
            </v-radio>
          </v-radio-group>
          <v-row>
            <v-col >
              <data-picker label="Data"
                           campo="dataInicio"
                           @dataSelecionada="selecaoData">
              </data-picker>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="atividade.horaInicio"
                placeholder="Hora Inicio"
                @horaSelecionada="selecaoHora"
                v-mask="'##:##'"
                outlined
                @blur="validateHora('horaInicio')"
            ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="atividade.horaFinal"
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
        <v-col cols="12">
          <label class="label-style" for="palestrante">Palestrante</label>  
          <v-text-field label="Palestrante"
                        v-model="atividade.palestrante"
                        outlined>
          </v-text-field>
        </v-col>
        </v-row>  
        <v-row>
        <v-col cols="12">
          <label class="label-style" for="requisitos">Requisitos</label>
          <v-text-field label="Requisitos"
                        v-model="requisitoTexto"
                        @keydown.enter="adicionarRequisito"
                        outlined>
          </v-text-field>
          <v-list disabled>
            <v-list-item-group v-model="atividade.requisitos"
                               color="primary">
              <v-list-item v-for="(requisito, index) in atividade.requisitos"
                           :key="index">
                <v-list-item-icon>
                  <v-icon>
                    mdi-check
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ requisito }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
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

export default {
  name: "pgCriarAtividadeDialogIndex",
  components: { dataPicker, timePicker },
  data() {
    return {
      atividade: {
        nome: null,
        local: null,
        numeroParticipantes: null,
        dataInicio: null,
        dataFim: null,
        horaInicio: null,
        horaFim: null,
        horario_inicio : null,
        horario_encerramento : null,
        palestrante: null,
        tipo: null,
        categoria: null,
        descricao: null,
        modalidade: null,
        requisitos: [],
        situacao : 'Ativa',
        evento_id: null
      },

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
    validateHora(field) {
      const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

      if (timeRegex.test(this.atividade[field])) {
        //const formattedTime = `${this.getCurrentDate()} ${this.evento[field]}:00`;
        return this.atividade[field]
      } else {
        // Clear the input if the format is not valid when losing focus
        this.atividade[field] = '';
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
        this.atividade.dataInicio = valor
      } else if (campo == 'dataFim') {
        this.atividade.dataFim = valor
      }
    },
    selecaoHora(campo, valor) {
      if (campo == 'horaInicio') {
        this.atividade.horaInicio = valor
      } else if (campo == 'horaFim') {
        this.atividade.horaFim = valor
      }
    },
    adicionarRequisito() {
      if (this.requisitoTexto.length > 0) {
        this.atividade.requisitos.push(this.requisitoTexto)
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
      this.atividade.horario_inicio = `${this.atividade.dataInicio} ${this.atividade.horaInicio}`;
      this.atividade.horario_encerramento = `${this.atividade.dataFim} ${this.atividade.horaFim}`;

      const formData = new FormData();

      formData.append('nome', this.atividade.nome);
      formData.append('descricao',  this.atividade.descricao);
      formData.append('local',  this.atividade.local);
      formData.append('horario_inicio',  this.atividade.horario_inicio);
      formData.append('horario_encerramento', this.atividade.horario_encerramento);
      formData.append('palestrante',  this.atividade.palestrante);
      formData.append('id_categoria', this.selectedCategoria)
      formData.append('id_tipo', this.selectedTipo)
      formData.append('id_modalidade', this.atividade.modalidade === 'presencial' ? 1 : 2);
      formData.append('quantidade_vagas',  this.atividade.numeroParticipantes);
      formData.append('evento_id', this.$route.params.eventoId);
      formData.append('situacao ', this.atividade.situacao);
     /* const atividade = {
        nome: this.atividade.nome,
        descricao: this.atividade.descricao,
        local: this.atividade.local,
        horario_inicio: this.atividade.horario_inicio,
        horario_encerramento: this.atividade.horario_encerramento,
        palestrante: this.atividade.palestrante,
        id_modalidade: this.atividade.id_modalidade,
        numeroParticipantes: this.atividade.numeroParticipantes,
        evento_id: this.$route.params.eventoId,
        situacao: this.atividade.situacao
      }*/


      apiAtividade.cadastrarAtividade(formData)
          .then( (response) => {
            console.log(formData);
             this.$router.push({ name: 'eventos' })
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