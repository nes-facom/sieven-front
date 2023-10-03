<script src="../../../store/index.js"></script>
<template>
  <div id="criarAtividadeDialog">
    <v-card class="pa-10"
            width="1000">
      <v-row justify="center"
             class="text-h3 font-weight-bold"
             style="color: #097FA8">
        {{ this.mensagemConfirmacao() }}
      </v-row>

      <v-row class="mt-10">
        <v-col>
          <v-text-field label="Nome"
                        v-model="atividade.nome"
                        outlined>
          </v-text-field>
          <v-text-field label="Local"
                        v-model="atividade.local"
                        outlined>
          </v-text-field>
          <v-text-field class="mb-0 pa-0"
                        label="Numero de participantes"
                        type="number"
                        v-model="atividade.numeroParticipantes"
                        outlined>
          </v-text-field>
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
          <v-text-field label="Palestrante"
                        v-model="atividade.palestrante"
                        outlined>
          </v-text-field>
          <v-textarea label="Descrição"
                      v-model="atividade.descricao"
                      height="142"
                      auto-grow
                      outlined>
          </v-textarea>
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
        descricao: null,
        modalidade: null,
        requisitos: [],
        situacao : 'Ativa',
        evento_id: 1
      },
      requisitoTexto: null
    }
  },
  methods: {
    mensagemConfirmacao() {
      if (this.editar) {
        return "Editar Atividade"
      } else {
        return "Criar Atividade"
      }
    },
    fecharCriarEventoDialog() {
      this.$emit("fecharCriarEventoDialog")
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
      //this.$emit('adicionarAtividade', this.atividade)
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
      formData.append('id_modalidade', this.atividade.modalidade === 'presencial' ? 1 : 2);
      formData.append('quantidade_vagas',  this.atividade.numeroParticipantes);
      formData.append('evento_id', this.$route.params.eventoId);
      formData.append('situacao ', this.atividade.situacao);


      apiAtividade.cadastrarAtividade(formData)
          .then( (response) => {
            console.log(response.data);
            window.location.reload();
          })
          .catch(error => {
            console.error(error);
          });
    }
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