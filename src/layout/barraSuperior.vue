<template>
  <div id="pgBarraSuperior">
    <v-app-bar app>
          <v-col>
            <v-img :src="require('@/assets/identidade/logo-horizontal-sem-fundo.png')"
                   class="ml-2"
                   width="110"
                   >
            </v-img>
          </v-col>

          <v-spacer></v-spacer>

          <v-toolbar-title v-if="this.$keycloak.authenticated"
                           class="mr-2"
                           style="color: grey">
            {{ this.$keycloak.idTokenParsed.preferred_username }}
          </v-toolbar-title>

          <div v-if="!this.$keycloak.authenticated">
            <v-btn class="mr-3"
                   color="#0088B7"
                   @click="redirecionarLogin">
              <span style="color: white">
                Entrar
              </span>
            </v-btn>
          </div>

          <div v-else
               class="mr-1">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon
                       v-bind="attrs"
                       v-on="on">
                  <v-icon>mdi-account</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="deslogar">
                  <v-list-item-icon>
                    <v-icon>
                      mdi-logout-variant
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    Deslogar
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
    </v-app-bar>
  </div>
</template>

<script>

export default {
  name: "pgBarraSuperiorIndex",
  methods: {
    // estouNaPagina(nomePagina) {
    //   return this.$route.name == nomePagina
    // },
    // redirecionarHome() {
    //   if (this.$store.getters.getLogado) {
    //     this.redirecionarDashboard()
    //   } else {
    //     this.redirecionarPaginainicial()
    //   }
    // },
    // redirecionarDashboard() {
    //   if (!this.estouNaPagina('eventos')){
    //     this.$router.push({ name: 'eventos' })
    //   }
    // },
    // redirecionarPaginainicial() {
    //   if (!this.estouNaPagina('paginaInicial')){
    //     this.$router.push({ name: 'paginaInicial' })
    //   }
    // },
    redirecionarLogin() {
      console.log('TESTE')
      this.$router.push({ name: 'eventos' })
    },
    logar() {
      this.$store.dispatch('logar')
    },
    deslogar() {
      this.$store.dispatch('deslogar')
      this.redirecionarPaginainicial()
    }
  }
}
</script>

<style scoped>

</style>