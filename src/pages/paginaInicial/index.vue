
<template>
  <v-sheet class="mx-auto" max-width=100vh>
    <v-slide-group show-arrows>
      <v-slide-group-item v-for="n in 10" :key="n">
        <v-row>
          <v-col cols="6">
            <v-img
              class="justify-end text-white"
              height="300"
              width="50vh"
              src="https://cbsoft2023.ufms.br/images/logos/cbsoft2023-horizontal-menor.png"
              cover
            ></v-img>
          </v-col>
          <v-col cols="6">
            <v-card class="mx-auto" max-width="50vh" height="300">
              <v-card-subtitle class="pt-3"> Congresso Brasileiro de Software</v-card-subtitle> <!-- pegar infos do backend -->
              <v-card-text>
                <div>O Congresso Brasileiro de Software: Teoria e Prática (CBSoft) é um evento realizado anualmente pela Sociedade Brasileira de Computação (SBC) com o objetivo de promover e incentivar a troca de experiências entre pesquisadores e profissionais da indústria e academia sobre as mais recentes pesquisas, tendências e inovações práticas e teóricas sobre software</div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="blue" depressed elevation="6"> SAIBA MAIS </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
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