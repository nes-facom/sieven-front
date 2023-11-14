<template>
  <v-card class="pa-10" width="700">
    <v-row class="text-h4 font-roboto d-flex justify-center" style="color: #097fa8">
      Realizar Inscriçao
    </v-row>
    <v-row class="mt-12 d-flex justify-center">
      Para realizar a inscrição na atividade {{ atividade.nome }}, informe seus
      dados abaixo.
    </v-row>
    <v-form ref="form" lazy-validation>
      <v-row class="mt-12">
        <v-col cols="12">
          <label class="label-style" for="nome">Nome Completo</label>
          <v-text-field class="campo-style" id="nome" v-model="inscricao.nome" placeholder="Digite seu Nome Completo"
            outlined :rules="requiredRule('Nome')" required>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-2">
        <v-col cols="12">
          <label class="label-style" for="cpf">CPF</label>
          <v-text-field class="campo-style" id="cpf" v-model="inscricao.cpf" v-mask="'###.###.###-##'"
            placeholder="Digite seu CPF" outlined :rules="requiredRule('CPF')" required>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-2">
        <v-col cols="12">
          <label class="label-style" for="email">E-mail</label>
          <v-text-field class="campo-style" id="email" v-model="inscricao.email" placeholder="Digite seu email" outlined
            :rules="requiredRule('Email')" required>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-2">
        <v-col cols="12">
          <label class="label-style" for="telefone">Telefone</label>
          <v-text-field class="campo-style" id="telefone" v-model="inscricao.telefone" placeholder="Digite seu telefone"
            outlined :rules="requiredRule('Telefone')" required>
          </v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-row class="mt-2">
      <v-col cols="12">
        <v-card-actions class="d-flex justify-center">
          <v-btn style="color: #097FA8" color="white" @click="fecharInscricaoDialog">Cancelar</v-btn>
          <v-btn style="color: white" color="#097FA8" @click="exibirInscricaoConfirmacao">Inscrever</v-btn>
        </v-card-actions>
        <v-snackbar v-model="snackbar" color="error" top>
          {{ mensagemErro }}
          <v-btn text @click="snackbar = false">Fechar</v-btn>
        </v-snackbar>
        <v-dialog v-model="inscricaoDialogConfirmacao" max-width="600">
          <v-card>
            <v-card-title class="text-h5 font-roboto d-flex justify-center" style="color: #097fa8">
              Confirmar Inscrição
            </v-card-title>
            <v-card-text>
              <div class="mt-2">
                Confirmar inscrição de <span class="italic-bold">{{ inscricao.nome }}</span> na atividade
                <span class="italic-bold">{{ atividade.nome }}</span> em
                <span class="italic-bold">{{ formatarData(atividade.horario_inicio) }}</span> das
                <span class="italic-bold">{{ formatarHora(atividade.horario_inicio) }}</span> às
                <span class="italic-bold">{{ formatarHora(atividade.horario_encerramento) }}</span> ?
              </div>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
              <v-btn style="color: #097FA8" @click="fecharInscricaoConfirmacao" color="white">Cancelar
              </v-btn>
              <v-btn style="color:white" color="#097FA8" @click="realizarInscricao">
                Confirmar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-if="inscricaoConfirmada" v-model="inscricaoDialogConfirmacao" max-width="700" class="pa-10">
          <v-card>
            <v-card-title class="text-h5 font-roboto d-flex justify-center" style="color: #097fa8">
              Inscrição Confirmada
            </v-card-title>
            <v-card-text>
              <v-row class="d-flex justify-center align-center">
                <v-col cols="12" class="text-center">
                  <v-img :src="require('@/assets/checkCircleFill.png')"  class="imagem-dimensionada" style="width: 50px; height: 50px;" />
                </v-col>
              <v-col cols="12" class="text-center mt-3">
                Sua inscrição foi realizada com sucesso!
              </v-col>
              <v-col cols="12" class="text-center">
                Confira seu email para mais informações.
              </v-col>
              <v-col cols="12" class="text-center mt-3">
                <div class="separator">
                  <span class="bold">Participante:</span> {{ inscricao.nome }}
                </div>
              </v-col>
              <v-col cols="12" class="text-center">
                <div class="separator">
                  <span class="bold">Atividade:</span> {{ atividade.nome }}
                </div>
              </v-col>
                <v-icon class="mr-1" size="26"> mdi-calendar-month-outline </v-icon> {{ formatarData(atividade.horario_inicio) }}
                <v-icon class="mr-1" size="26">mdi-clock-outline</v-icon> {{ formatarHora(atividade.horario_inicio)  }} as {{ formatarHora(atividade.horario_encerramento) }}
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import apiInscricao from "../../../api/resources/inscricao.js";
import { VueMaskDirective } from "v-mask";
import Vue from 'vue'

export default {
  name: "inscricaoDialog",
  props: {
    dialog: Boolean,
    atividade: Object,
  },
  data() {
    return {
      inscricao: {
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
        checkin: false,
      },
      inscricaoDialogConfirmacao: false,
      inscricaoConfirmada: false,
      mensagemErro: "",
      snackbar: false,
    };
  },

  created() {
    Vue.directive("mask", VueMaskDirective);
  },

  methods: {
    fecharInscricaoConfirmacao() {
      this.inscricaoDialogConfirmacao = false;
    },

    exibirInscricaoConfirmacao() {
      if (
        this.inscricao.nome &&
        this.inscricao.cpf &&
        this.inscricao.email &&
        this.inscricao.telefone
      ) {

        this.inscricaoDialogConfirmacao = true;
      } else {
        this.mensagemErro = "Por favor, preencha todos os campos antes de confirmar a inscrição.";
        this.exibirMensagemErro();

      }
    },

    exibirMensagemErro() {
      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, 5000);
    },

    fecharInscricaoDialog() {
      this.$emit("fecharInscricaoDialog");
    },
    realizarInscricao() {

      if (this.$refs.form.validate()) {
        const inscricao = {
          atividade_id: this.$route.params.id,
          nome: this.inscricao.nome,
          cpf: this.inscricao.cpf,
          email: this.inscricao.email,
          telefone: this.inscricao.telefone,
          checkin: this.inscricao.checkin,
        };
        apiInscricao.realizarInscricao(inscricao).then((response) => {
          console.log(response);

          this.inscricaoConfirmada = true
        });
      }
    },
    formatarHora(hora) {
      const data = new Date(hora);
      const horaFormatada = data.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return horaFormatada;
    },
    formatarData(data) {
      const dataFormatada = new Date(data).toLocaleDateString("pt-BR");
      return dataFormatada;
    },
    requiredRule(fieldName) {
      return [(v) => !!v || `${fieldName} é obrigatório.`];
    },
  },
};
</script>

<style scoped>
.label-style {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  color: #888;
}

.campo-style {
  font-family: "Roboto", sans-serif;
  font-weight: normal;
  color: black;
}

.italic-bold {
  font-style: italic;
  font-weight: bold;
}
.separator {
  position: relative;
  text-align: center;
  margin-bottom: 10px;
}
.separator:before {
  content: '';
  position: absolute;
  top: 50%;
  width: 100%;
  border-bottom: 1px solid #ccc;
  z-index: -1;
}
.bold {
  font-weight: bold;
}

.imagem-centralizada {
  display: block;
  margin: 0 auto;
}
</style>
