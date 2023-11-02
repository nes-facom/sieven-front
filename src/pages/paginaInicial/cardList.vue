<template>
  <v-container class="no-border" align="center" style="width: 120.125rem; height: 45rem;">
    <v-container style="width: 83.5rem; height: 20rem;">
      <v-row>
        <v-col
          v-for="(item, index) in items"
          :key="index"
          cols="12"
          sm="6"
          md="3">
          <v-card class="elevation-0" width="16.375rem">
            <v-img :src="item.imagem" height="8.188rem" cover></v-img> 
            <v-card-title>{{ item.nome }}</v-card-title>
            <v-card-subtitle>{{ item.data_inicial }}</v-card-subtitle>
            <v-card-text>
              <v-icon>mdi-map-marker</v-icon>
              <span class="text-subtitle-1" style="color: #4C576C">{{ item.local }}</span>
            </v-card-text>
          </v-card>
        </v-col>
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
    }
  }
};
</script>
