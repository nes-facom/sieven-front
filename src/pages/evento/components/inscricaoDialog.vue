<template>
  <v-card class="pa-10" width="700">
    <v-row class="text-h4 font-roboto d-flex justify-center" style="color: #097fa8">
      Realizar Inscriçao
    </v-row>
    <v-row class="mt-12 d-flex justify-center">
      <div>Para realizar a inscrição na atividade <b>{{ atividade.nome }}</b>, informe seus
        dados abaixo.</div>
    </v-row>
    <v-form ref="form" lazy-validation>
      <v-row class="mt-12">
        <v-col cols="12">
          <label class="label-style" for="nome">Nome Completo</label>
          <v-text-field class="campo-style" id="nome" v-model="inscricao.nome" placeholder="Digite seu Nome Completo"
            outlined required>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-2">
        <v-col cols="12">
          <label class="label-style" for="cpf">CPF</label>
          <v-text-field class="campo-style" id="cpf" v-model="inscricao.cpf" v-mask="'###.###.###-##'"
            placeholder="Digite seu CPF" outlined required>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-2">
        <v-col cols="12">
          <label class="label-style" for="email">E-mail</label>
          <v-text-field class="campo-style" id="email" v-model="inscricao.email" placeholder="Digite seu email" outlined
            required>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-2">
        <v-col cols="12">
          <label class="label-style" for="telefone">Telefone</label>
          <v-text-field class="campo-style" id="telefone" v-model="inscricao.telefone" placeholder="Digite seu telefone"
            outlined required v-mask="'(##) #########'">
          </v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-col cols="12">
      <v-card-actions class="d-flex justify-center">
        <v-btn style="color: #097FA8" color="white" @click="fecharInscricaoDialog">Cancelar</v-btn>
        <v-btn style="color: white" color="#097FA8" @click="exibirInscricaoConfirmacao">Inscrever</v-btn>
      </v-card-actions>
    </v-col>
    <v-snackbar v-model="snackbar" color="error" top>
      {{ mensagemErro }}
      <v-btn text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
    <v-dialog v-model="inscricaoDialogConfirmacao" max-width="400" style="overflow: hidden;">
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
    <v-dialog v-if="inscricaoConfirmada" v-model="inscricaoConfirmada" max-width="350" class="pa-10">
      <v-card>
        <v-card-title class="text-h6 font-roboto d-flex justify-center align-center"
          style="color: #097fa8; padding-left: 16px; padding-right: 16px;">
          <div class="text-center" style="flex: 1; margin-right: -15px;">Inscrição Confirmada</div>
          <v-btn icon @click="fecharInscricaoDialog">
            <v-icon size="14" color="CDCDCD">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row class="d-flex justify-center align-center">
            <v-col cols="12" class="text-center">
              <v-img :src="require('@/assets/checkCircleFill.png')" class="imagem-centralizada" />
            </v-col>
            <v-col cols="12" class="text-center mt-3">
              Sua inscrição foi realizada com sucesso!<br>
              Confira seu email para mais informações.
            </v-col>
            <v-col cols="12" class="text-center mt-3">
              <span class="bold">Participante:</span> {{ inscricao.nome }}

            </v-col>
            <v-col cols="12" class="text-center">

              <span class="bold">Atividade:</span> {{ atividade.nome }}
            </v-col>
            <v-col cols="12" class="text-center">

              <v-icon class="mr-1" size="26"> mdi-calendar-month-outline </v-icon> {{
                formatarData(atividade.horario_inicio) }}
              <v-icon class="mr-1" size="26" style="margin-left: 10px;"> mdi-clock-outline </v-icon> {{
                formatarHora(atividade.horario_inicio) }} as {{ formatarHora(atividade.horario_encerramento) }} <br>

              <div style="display: block; margin-top: 10px;">
                <v-icon class="mr-1" size="26"> mdi-map-marker-outline</v-icon> {{ atividade.local }}
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-if="cpfCadastrado" v-model="cpfCadastrado" max-width="400">
      <v-card>
        <v-card-title class="text-h5 font-roboto d-flex justify-center" style="color: #ff0000">
          CPF já cadastrado!
        </v-card-title>
        <v-card-text>
          <div class="mt-2">
            Não foi possível realizar a inscrição. O CPF informado já está inscrito nessa atividade com o email
            {{ inscricao.email.length > 2 ? inscricao.email.substring(0, 2) + '*'.repeat(inscricao.email.length - 2) : '' }}.
          </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn style="color: #ff0000" @click="fecharCpfCadastrado" color="white">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      cpfCadastrado: false,
    };
  },

  created() {
    Vue.directive("mask", VueMaskDirective);
  },

  methods: {

    fecharCpfCadastrado() {
    this.cpfCadastrado = false;
    },
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
      this.inscricao.nome = ""
      this.inscricao.cpf = ""
      this.inscricao.email = ""
      this.inscricao.telefone = ""
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
        apiInscricao.realizarInscricao(inscricao)
      .then((response) => {
        console.log(response.status)
        if (response.status === 200){
          this.inscricaoConfirmada = true;
        } else if(response.status === 401){
          this.cpfCadastrado = true;
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
         error.response.status === 401
        } 
        
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
  width: 50px;
  height: 50px;
}
</style>
