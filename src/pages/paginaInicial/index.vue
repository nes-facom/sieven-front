<template>
  <v-carousel>
    <v-carousel-item v-for="(event, index) in events" :key="index">
      <v-row align="center" justify="center" class="fill-height">
        <!-- Imagem do evento -->
        <v-col cols="12" md="4" class="text-center">
          <v-img :src="event.image" class="rounded-lg" max-height="300"></v-img>
        </v-col>
        
        <!-- Detalhes do evento -->
        <v-col cols="12" md="6" class="text-center">
          <h2 class="headline">{{ event.title }}</h2>
          <p>{{ event.description }}</p>
          <p class="caption">{{ event.date }} | {{ event.time }}</p>
          <v-btn @click="showDetails(event)" color="primary">Saiba Mais</v-btn>
        </v-col>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "paginaInicial",
  data() {
    return {
      events: [
        {
          title: 'Evento 1',
          description: 'Descrição do Evento 1.',
          date: '01/01/2023',
          time: '14:00',
          image: "../../assets/agetic_logo.png",
        },
        {
          title: 'Evento 2',
          description: 'Descrição do Evento 2.',
          date: '02/01/2023',
          time: '15:30',
          image: "../../assets/agetic_logo.png",
        },
        // Adicione mais eventos conforme necessário
      ],
    };
  },
  methods: {
    showDetails(event) {
      // Lógica para exibir mais detalhes do evento
      console.log('Detalhes do evento:', event);
    },
  },
};
</script>