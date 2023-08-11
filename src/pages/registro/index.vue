<template>
  <div class="pgCadastro">
      <v-row justify="center">
        <v-card>
          <v-form v-model="valido">
            <v-row justify="center">
              <v-card-title class="text-h4 mt-5 mb-1">
                Cadastro de Usuário
              </v-card-title>
            </v-row>
            <v-card-text class="mb-5 ml-1">
              Já possui uma conta? Clique
              <router-link to='register'
                           @click="redirectToLogin">
                aqui
              </router-link>
              para fazer login
            </v-card-text>
            <v-text-field label="Nome Completo"
                          class="ml-5 mr-5"
                          variant="outlined">
            </v-text-field>
            <v-text-field label="Senha"
                          class="ml-5 mr-5"
                          type="password"
                          variant="outlined">
            </v-text-field>
            <v-text-field label="CPF"
                          class="ml-5 mr-5"
                          variant="outlined">
            </v-text-field>
            <v-text-field label="E-mail"
                          class="ml-5 mr-5"
                          type="email"
                          variant="outlined">
            </v-text-field>
            <v-text-field label="Telefone"
                          class="ml-5 mr-5"
                          variant="outlined">
            </v-text-field>
            <v-checkbox v-model="formulario.termos"
                        class="ml-5 mr-5"
                        label="Estou ciente dos Termos de Uso e Políticas do SIEVEN e da UFMS*"
                        :value="true">
            </v-checkbox>
            <v-row justify="center"
                   class="mb-4">
              <v-col>
                <v-btn color="grey"
                       class="text-white ml-6"
                       variant="flat"
                       @click="redirectToLogin">
                  Voltar
                </v-btn>
              </v-col>
              <v-col class="d-flex justify-end">
                <v-btn color="#0088B7"
                       class="text-white mr-6"
                       variant="flat"
                       @click="newMethodAlert">
                  Criar Conta
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-row>
  </div>
</template>

<script>
export default {
  name: 'pgCadastroIndex',
  data() {
    return {
      valido: null,
      formulario: {
        termos: false
      }
    }
  },
  methods: {
    redirectToLogin() {
      this.$router.push(`/`)
    },
    newMethodAlert() {
      alert("Utilize novo método de login!")
      this.redirectToLogin()
    }
  }
}
</script>
