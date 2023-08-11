<template>
  <div id="pgPaginaInicial">
    <v-row class="pt-8">
      <v-col class="d-flex justify-center">
        <v-card class="pb-12"
                width="90%">
          <v-row justify="center">
            <v-card-title class="mt-8 mb-4 text-h3 font-weight-bold"
                          style="color: #0088B7">
              Oque é o SIEVEN?
            </v-card-title>
          </v-row>

          <v-card-text class="pa-4 text-justify text-subtitle-1">
            
          </v-card-text>

          <div>
            <v-card v-for="item in sieven"
                    :key="item.id"
                    class="mb-10 mt-3 pa-2 d-flex align-center justify-end rounded-0 text-h3 font-weight-bold"
                    color="#0088B7"
                    :width="item.tamanho"
                    flat>
              <v-icon class="mr-4"
                      size="60"
                      color="white">
                {{ item.icone }}
              </v-icon>
              <span class="mr-2"
                    style="color: white">
                {{ item.titulo }}
              </span>
            </v-card>
          </div>
        </v-card>
      </v-col>

      <v-col class="d-flex justify-center">
        <v-card class="pb-16"
                width="90%">
          <v-row justify="center">
            <v-card-title class="mt-8 mb-4 text-h3 font-weight-bold"
                          style="color: #0088B7">
              Parceiros
            </v-card-title>
          </v-row>

          <v-row justify="center">
            <v-col>
              <v-img :src="require('../../assets/agetic_logo.png')"
                     class="ml-auto mr-auto"
                     width="65%"
                     @click="redirecionarAgetic">
              </v-img>
            </v-col>
          </v-row>

          <v-row>
            <v-col >
              <v-img :src="require('../../assets/ufms_logo.png')"   
                     class="ml-auto"
                     width="60%"
                     @click="redirecionarUfms">
              </v-img>
            </v-col>
            <v-col>
              <v-row>
                <v-col>
                  <v-img :src="require('../../assets/facom_logo.png')"
                         class="ml-14"
                         width="40%"
                         @click="redirecionarFacom">
                  </v-img>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-img :src="require('../../assets/nucleo_logo.png')"
                         class="ml-16"
                         width="35%"
                         @click="redirecionarNes">
                  </v-img>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: "pgPaginaInicialIndex",
  data() {
    return {
      sieven: [
        { id: 1, titulo: 'Ensino', icone: 'mdi-school-outline', tamanho: '50%'},
        { id: 2, titulo: 'Pesquisa', icone: 'mdi-magnify', tamanho: '70%'},
        { id: 3, titulo: 'Extensão', icone: 'mdi-book-arrow-right-outline', tamanho: '90%'}
      ]
    }
  },
  methods: {
    redirecionarAgetic() {
      window.open("https://agetic.ufms.br/", "_blank")
    },
    redirecionarUfms() {
      window.open("https://www.ufms.br/", "_blank")
    },
    redirecionarFacom() {
      window.open("https://www.facom.ufms.br/", "_blank")
    },
    redirecionarNes() {
      window.open("https://nes.facom.ufms.br/projeto/sieven-sistema-de-gestao-de-eventos", "_blank")
    }
  },
  created() {
    this.$store.dispatch('deslogar')
  }
}
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0px;
}
#pgPaginaInicial {
  height: 100vh;
  width: 100vw;
  background-image: url("../../assets/background-login.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>