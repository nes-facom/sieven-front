<template>
  <v-container fluid fill-height>
    <!-- Logo do sistema -->
    <v-row justify="center" align="center" class="mt-12">
      <v-img
        :src="logo" 
        max-height="100"
        max-width="400"
        contain
      ></v-img>
    </v-row>

    <!-- Container de login -->
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card elevation="0">
          <!-- Campos de Email e Senha -->
          <v-card-text>
            <v-form>
              
              <v-text-field
                label="Entre com seu e-mail"
                outlined
                v-model="email"
              ></v-text-field>
              
              <v-text-field
                label="Senha"
                outlined
                type="password"
                v-model="password"
              ></v-text-field>

              <!-- Opção para recuperar senha -->
              <v-row>
                <v-col class="text-right">
                  <v-btn text @click="forgotPassword">Esqueceu sua senha?</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <!-- Botão de Login -->
          <v-card-actions>
            <v-btn block @click="login" class="primary">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import apiLogin from '@/api/resources/login.js'
import middleware from '@/middleware/localStorage.js'

export default {
  name: "pgPaginaLoginIndex",
  data() {
    return {
      email: '',
      password: '',
      logo: require('@/assets/identidade/logo-sieven-login.png')
    };
  },
  methods: {
    login() {
      // Lógica de login aqui
      const credenciais = 
        {
          email: this.email,
          password: this.password
        }
        apiLogin.login(credenciais).then(res => {
          middleware.passarToken('token', res)
          this.$router.push({path: '/eventos'})
          this.$store.commit('setPassport', this.email);
          this.$store.commit('setAdminStatus', true);
        }).catch(err => 
          {
            console.log(err)
          }
      )
    },
    forgotPassword() {
      // Lógica para recuperar senha aqui
      console.log('Esqueceu sua senha?');
    },
  },
};
</script>

<style scoped>
  /* Estilização personalizada aqui */
  .v-card {
    border-radius: 10px;
    overflow: hidden;
  }

  .primary {
    background-color: #1976D2 !important;
  }

  .blue--text {
    color: #1976D2 !important;
    text-decoration: underline;
  }

  .blue--text:hover {
    background-color: transparent !important;
  }
</style>