<template>
      <v-card class="pa-10" width="700">
        <v-row class="text-h4 font-roboto d-flex justify-center" style="color: #097FA8">
            Realizar Inscriçao
        </v-row>
        <v-row class="mt-12">
          Para realizar a inscrição na atividade {{ atividade.nome }}, informe seus dados abaixo.
        </v-row>
          <v-form ref="form" lazy-validation>
            <v-row class="mt-12">
                <v-col cols="12">
                    <label class="label-style" for="nome">Nome Completo</label>
                     <v-text-field class="campo-style"
                                id="nome"
                                v-model="nomeCompleto"
                                placeholder="Nome Completo"
                                outlined
                                required>
                        </v-text-field>
                </v-col>
            </v-row>
            <v-row class="mt-2">
                <v-col cols="12">
                    <label class="label-style" for="cpf">CPF</label>
                     <v-text-field class="campo-style"
                                id="cpf"
                                v-model="cpf"
                                placeholder="Digite seu CPF"
                                outlined
                                required>
                        </v-text-field>
                </v-col>
            </v-row>
            <v-row class="mt-2">
                <v-col cols="12">
                    <label class="label-style" for="email">E-mail</label>
                     <v-text-field class="campo-style"
                                id="cpf"
                                v-model="email"
                                placeholder="Digite seu email"
                                outlined
                                required>
                        </v-text-field>
                </v-col>
            </v-row>
            <v-row class="mt-2">
                <v-col cols="12">
                    <label class="label-style" for="telefone">Telefone</label>
                     <v-text-field class="campo-style"
                                id="telefone"
                                v-model="telefone"
                                placeholder="Digite seu telefone"
                                outlined
                                required>
                        </v-text-field>
                </v-col>
            </v-row>
          </v-form>
        <v-row class="mt-2">
            <v-col cols="12">
                <v-card-actions>
                    <v-btn style="color:white" color="red" @click="fecharInscricaoDialog">Cancelar</v-btn>
                    <v-btn style="color:white" color="#097FA8" @click="realizarInscricao">Inscrever</v-btn>
        </v-card-actions>
        </v-col>
        </v-row>
      </v-card>
  </template>
  
  <script>
  import apiInscricao from '../../../api/resources/inscricao.js'

  export default {
    name: "inscricaoDialog",
    props: {
      dialog: Boolean,
      atividade: Object,
    },
    data() {
      return {
        nomeCompleto: "",
        cpf: "",
        email: "",
        telefone: "",
      };
    },
    methods: {
      fecharInscricaoDialog() {
        this.$emit("fecharInscricaoDialog");
      },
      realizarInscricao() {
        // Validar os campos e realizar a inscrição
        if (this.$refs.form.validate()) {
            apiInscricao.realizarInscricao().then(response => {
                console.log(response)
            })
          // Enviar os dados para o backend ou realizar a inscrição
          // Reinicialize os campos após a inscrição bem-sucedida
          this.nomeCompleto = "";
          this.cpf = "";
          this.email = "";
          this.telefone = "";
          this.fecharDialog();
        }
      },
    },
  };
  </script>
  
  <style scoped>

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

  </style>