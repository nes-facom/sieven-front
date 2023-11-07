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
    <v-row>
      <v-col>
        <v-icon size="26">mdi-calendar-month-outline</v-icon>
        {{ formatarData(event.data_inicial)}} - {{ formatarData(event.data_final)}}
      </v-col>
      <v-col>
        <v-icon size="26">mdi-clock-outline</v-icon>
        {{ formatarHora(event.data_inicial)}} - {{ formatarHora(event.data_final) }}
      </v-col>
      <v-btn @click="showDetails(event.id)" color="primary">Saiba Mais</v-btn>
    </v-row>
  </v-col>
</v-row>

      </v-carousel-item>
    </v-carousel>
    <component :is="componenteDinamico"></component>
      <v-row justify="center">
        <v-btn @click="redirecionaEventos()" color="primary">Ver Mais</v-btn>
      </v-row>
    <spacer></spacer>
    <v-footer class="black">
      <v-container dark class="black white--text text-center">
        <v-layout align-center justify-center class="icons-container">
          <v-flex>
            <v-btn icon class="mr-4">
              <v-img :src="require('@/assets/home/agetic.png')" max-height="45" max-width="35"></v-img>
            </v-btn>
            <v-btn icon class="mr-4">
              <v-img :src="require('@/assets/home/nes.png')" max-height="45" max-width="35"></v-img>
            </v-btn>
            <v-btn icon>
              <v-img :src="require('@/assets/home/ufms.png')" max-height="45" max-width="35"></v-img>
            </v-btn>
          </v-flex>
        </v-layout>
        <spacer></spacer>
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
    }, 
    redirecionaEventos() {
      this.$router.push({name: 'eventos'})
    },
    formatarData(data) {
      const parts = data.split(' ');
      const dataPart = parts[0];
      //eslint-disable-next-line
      const [ano, mes, dia] = dataPart.split('-');
      return `${dia}/${mes}`;
    }, 
    formatarHora(data) {
      const partes = data.split(' ');
      const horaParte = partes[1];
      const [horas, minutos] = horaParte.split(':');
      return `${horas}:${minutos}`;
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