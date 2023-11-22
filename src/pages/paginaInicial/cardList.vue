<template>
  <v-container class="no-border" align="center" style="width: 120.125rem; height: 45rem;">
    <v-container style="width: 83.5rem; height: 20rem;">
      <v-row>
        <v-col v-for="(event, index) in items" :key="index" cols="12" sm="6" md="3">
          <v-card class="elevation-0" width="16.375rem">
            <v-img :src="event.imagem" height="8.188rem" cover></v-img>
            <v-card-subtitle class="py-0 font-weight-bold" style="color: #0088B7">
              {{ formatarDataAbreviada(event.data_inicial) }} > {{ formatarDataAbreviada(event.data_final) }}
            </v-card-subtitle>
            <v-card-title>
              {{ event.nome }}
            </v-card-title>
            <v-card-subtitle class="py-0 font-weight-bold" style="color: #AEAEAE">
              <v-icon class="mr-1" size="20">
                mdi-map-marker-outline
              </v-icon>
              {{ event.local }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn @click="redirecionaEventos()" color="primary">Ver Mais</v-btn>
      </v-row>
    </v-container>
  </v-container>
</template>

<style>
.no-border .v-card {
  border: none;
}
</style>

<script>
import apiEventos from '../../api/resources/evento.js'
export default {

  data: () => ({
    name: "middleCards",
    items: []
  }),

  created() {
    apiEventos.listarEventosPaginaInicial().then((response) => {
      this.items = response.maisEventos
    })
  },
  methods: {
    toggleDetails(item) {
      item.showDetails = !item.showDetails;
    },
  
    formatarDataAbreviada(value) {
      const mesesAbreviados = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
      const partes = value.split(" ")[0].split("-");
      const dia = partes[2];
      const mes = mesesAbreviados[parseInt(partes[1], 10) - 1];
      return `${dia} ${mes}`;
    },
  }
};
</script>
