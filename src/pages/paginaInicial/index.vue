<template>
  <div>
    <v-carousel class="grey lighten-5" style="max-width: 120.125rem; max-height: 34.25rem;">
      <v-carousel-item v-for="(event, index) in events" :key="index">
        <v-row align="center" justify="center" class="fill-height">

          <v-col cols="12" md="4" class="text-center">
            <v-img :src="event.imagem" class="rounded-lg" max-height="300"></v-img>
          </v-col>
          <v-col cols="12" md="4" class="text-left">
            <h2 class="headline">{{ event.nome }}</h2>
            <p>{{ event.descricao }}</p>
            <p class="caption">{{ event.horario_inicio }} | {{ event.horario_encerramento }}</p>
            <v-btn @click="showDetails(event.id)" color="primary">Saiba Mais</v-btn>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <component :is="componenteDinamico"></component>

    <v-footer class="black">
  <v-container dark class="black white--text text-center">
    <v-layout align-center justify-center class="icons-container">
      <v-flex>
        <!-- <v-btn icon class="mr-4">
          <v-img :src="require('@/assets/home/agetic.png')" max-height="35" max-width="35"></v-img>
        </v-btn>
        <v-btn icon class="mr-4">
          <v-img :src="require('@/assets/home/nes.png')" max-height="35" max-width="35"></v-img>
        </v-btn>
        <v-btn icon>
          <v-img :src="require('@/assets/home/ufms.png')" max-height="35" max-width="35"></v-img>
        </v-btn> -->
      </v-flex>
    </v-layout>
    <v-card-text class="white--text">
      UFMS - Universidade Federal de Mato Grosso do Sul <br>
      NES - Núcleo de Práticas em Engenharia de Software <br>
      AGETIC - Agência de Tecnologia da Informação e Comunicação
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text class="white--text">
      {{ new Date().getFullYear() }} — <strong>SIEVEN </strong>
    </v-card-text>
  </v-container>
</v-footer>
  </div>
</template>

<script>
import apiEventos from '../../api/resources/evento.js'
import ComponenteFilho from './cardList.vue';
export default {
  name: "paginaInicial",
  data() {
    return {

      componenteDinamico: ComponenteFilho,
      events: [],
      items: [],

    };

  },
  created() {
    apiEventos.listarEventosPaginaInicial().then((response) => {
      this.events = response.eventosDestaque
    })
  },
  methods: {
    showDetails(eventoId) {
      this.$router.push({ name: 'evento', params: { id: eventoId } })
    }
  }
};
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>